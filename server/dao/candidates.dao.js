const config = require('../config');
const BasicDAO = require('./basic.dao');
const { toCamel } = require('../utils');

class Candidates extends BasicDAO {
  constructor(connection) {
    super('candidates');
    this.top = config.pageSettings.itemsPerPage;
    this.connection = connection;
  }

  async create({ candidate, links, city: cityName }) {
    try {
      await this.connection.beginTransactionAsync();

      const [city] = toCamel(await this.connection.queryAsync({
        sql: 'SELECT id FROM cities WHERE name = ?',
        values: [cityName],
      }));

      candidate.cityId = city.id;
      const id = await super.create(candidate);

      await Promise.all(links.map(async (link) => {
        await this.connection.queryAsync({
          sql: `INSERT INTO links (link, candidate_id)
                VALUES (?, ?)`,
          values: [link, id],
        });
      }));

      await this.connection.commit();
      return id;
    } catch (err) {
      await this.connection.rollbackAsync();
      throw err;
    }
  }

  async readOne(id) {
    const candidate = await super.readOne(id);

    candidate.links = await this.connection.queryAsync({
      sql: 'SELECT link FROM links WHERE candidate_id = ?',
      values: [id],
    }).map(linkObject => linkObject.link);

    [{ name: candidate.city }] = await this.connection.queryAsync({
      sql: 'SELECT cities.name FROM cities WHERE cities.id = ?',
      values: [candidate.cityId],
    });
    candidate.skills = await this.connection.queryAsync({
      sql: `SELECT s.name FROM skills_has_candidates s_c 
            INNER JOIN skills s 
            ON s.id=s_c.skill_id 
            WHERE s_c.candidate_id = ?`,
      values: [id],
    }).map(skill => skill.name);
    delete candidate.cityId;

    return candidate;
  }

  async read(page = 1) {
    const fields = `${this.table}.${this.idFieldName}, ${this.table}.name, surname,
                      primary_skill, status, last_change_date, cities.name AS city`;
    const joins = `LEFT JOIN cities ON ${this.table}.city_id = cities.id`;

    const candidates = await super.read({
      fields,
      addition: joins,
      page,
      amount: this.top,
    });

    return candidates;
  }

  async update(id, { candidate, links, city: cityName, skills }) {
    try {
      await this.connection.beginTransactionAsync();

      const [city] = await this.connection.queryAsync({
        sql: 'SELECT id FROM cities WHERE name = ?',
        values: [cityName],
      });

      candidate.city_id = city.id;

      await this.connection.queryAsync({
        sql: 'DELETE FROM links WHERE candidate_id = ?',
        values: [id],
      });

      await this.connection.queryAsync({
        sql: `DELETE FROM skills_has_candidates 
              WHERE candidate_id = ?`,
        values: [id],
      });

      await super.update(id, candidate);
      await Promise.all(links.map(async (link) => {
        await this.connection.queryAsync({
          sql: 'INSERT INTO links (link, candidate_id) VALUES (?, ?)',
          values: [link, id],
        });
      }));

      await Promise.all(skills.map(async (skill) => {
        const [{ id: skillId }] = await this.connection.queryAsync({
          sql: 'SELECT skills.id FROM skills WHERE name = ?',
          values: [skill],
        });

        await this.connection.queryAsync({
          sql: `INSERT INTO skills_has_candidates
                (skill_id, candidate_id) VALUES (?, ?)`,
          values: [skillId, id],
        });
      }));

      await this.connection.commit();
      return null;
    } catch (err) {
      await this.connection.rollbackAsync();
      throw err;
    }
  }
}

module.exports = Candidates;
