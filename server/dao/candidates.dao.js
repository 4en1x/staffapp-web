const config = require('../config');
const BasicDAO = require('./basic.dao');
const { toCamel } = require('convert-keys');

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
        sql: `SELECT id FROM cities
              WHERE name = ?`,
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
    try {
      await this.connection.beginTransactionAsync();
      const candidate = await super.readOne(id);

      candidate.links = toCamel(await this.connection.queryAsync({
        sql: 'SELECT link FROM links WHERE candidate_id = ?',
        values: [candidate[this.idFieldName]],
      }).map(name => name.link));

      candidate.city = toCamel(await this.connection.queryAsync({
        sql: 'SELECT cities.name FROM cities WHERE cities.id = ?',
        value: [candidate.cityId],
      }));

      delete candidate.cityId;

      await this.connection.commit();
      return candidate;
    } catch (err) {
      await this.connection.rollbackAsync();
      throw err;
    }
  }

  async read(page = 1) {
    try {
      await this.connection.beginTransactionAsync();

      const fields = `${this.table}.${this.idFieldName}, ${this.table}.name, surname, primary_skill, status, last_change_date, cities.name AS city`;
      const joins = `LEFT JOIN cities ON ${this.table}.city_id = cities.id`;

      const candidates = await super.read({
        fields,
        addition: joins,
        page,
        amount: this.top,
      });

      await this.connection.commit();
      return candidates;
    } catch (err) {
      await this.connection.rollbackAsync();
      throw err;
    }
  }

  async update(id, { candidate, links, city: cityName }) {
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

      await super.update(id, candidate);
      await Promise.all(links.map(async (link) => {
        await this.connection.queryAsync({
          sql: 'INSERT INTO links (link, candidate_id) VALUES (?, ?)',
          values: [link, id],
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
