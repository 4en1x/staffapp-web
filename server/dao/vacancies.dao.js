const config = require('../config');
const BasicDAO = require('./basic.dao');
const { toCamel } = require('../utils');

class Vacancies extends BasicDAO {
  constructor(connection) {
    super('vacancies');
    this.top = config.pageSettings.itemsPerPage;
    this.connection = connection;
  }

  async create({ vacancy, skills, city: cityName }) {
    try {
      await this.connection.beginTransactionAsync();

      const [city] = await this.connection.queryAsync({
        sql: 'SELECT cities.id FROM cities WHERE name = ?',
        values: [cityName],
      });

      vacancy.city_id = city.id;

      const id = await super.create(vacancy);

      await Promise.all(skills.map(async (skill) => {
        const [{ id: skillId }] = await this.connection.queryAsync({
          sql: 'SELECT skills.id FROM skills WHERE name = ?',
          values: [skill.name],
        });

        await this.connection.queryAsync({
          sql: `INSERT INTO vacancy_has_skills
                (skill_id, vacancy_id, weight) VALUES (?, ?, ?)`,
          values: [skillId, id, skill.weight],
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

      const vacancy = await super.readOne(id);
      if (!vacancy) {
        return null;
      }

      const [{ name: city }] = await this.connection.queryAsync({
        sql: 'SELECT name FROM cities WHERE id = ?',
        values: [vacancy.city_id],
      });

      vacancy.city = city;
      delete vacancy.city_id;

      vacancy.skills = await this.connection.queryAsync({
        sql: `SELECT name, weight FROM vacancy_has_skills v
              INNER JOIN skills ON skills.id = v.skill_id
              WHERE vacancy_id = ?`,
        values: [id],
      });

      await this.connection.commit();
      return toCamel(vacancy);
    } catch (err) {
      await this.connection.rollbackAsync();
      throw err;
    }
  }

  async readPage(page = 1) {
    try {
      await this.connection.beginTransactionAsync();

      const fields = `${this.table}.${this.idFieldName}, ${this.table}.name,
                      description, status, cities.name AS city`;
      const joins = `LEFT JOIN cities ON ${this.table}.city_id = cities.id`;
      const limit = 'LIMIT ?, ?';
      const values = [(page - 1) * this.top, this.top];

      const candidates = await super.readAll({
        fields,
        addition: joins,
        limit,
        values,
      });

      await this.connection.commit();
      return candidates;
    } catch (err) {
      await this.connection.rollbackAsync();
      throw err;
    }
  }

  async update(id, { vacancy, skills, city: cityName }) {
    try {
      await this.connection.beginTransactionAsync();

      const [city] = await this.connection.queryAsync({
        sql: 'SELECT cities.id FROM cities WHERE name = ?',
        values: [cityName],
      });

      vacancy.city_id = city.id;

      await this.connection.queryAsync({
        sql: 'DELETE FROM vacancy_has_skills WHERE vacancy_id = ?',
        values: [id],
      });

      await super.update(id, vacancy);

      await Promise.all(skills.map(async (skill) => {
        const [{ id: skillId }] = await this.connection.queryAsync({
          sql: 'SELECT skills.id FROM skills WHERE name = ?',
          values: [skill.name],
        });

        await this.connection.queryAsync({
          sql: `INSERT INTO vacancy_has_skills
                (skill_id, vacancy_id, weight) VALUES (?, ?, ?)`,
          values: [skillId, id, skill.weight],
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

module.exports = Vacancies;
