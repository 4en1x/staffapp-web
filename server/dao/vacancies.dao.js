const config = require('../config');
const BasicDAO = require('./basic.dao');

class Vacancies extends BasicDAO {
  constructor(connection) {
    super('vacancies');
    this.top = config.db.itemsPerPage;
    this.connection = connection;
  }

  async create(vacancy, skills, cityName) {
    try {
      await this.connection.beginTransactionAsync();
      const [city] = await this.connection.queryAsync({
        sql: `SELECT id FROM cities
              WHERE name = ?`,
        values: [cityName],
      });
      vacancy.city_id = city.id;
      const id = await super.create(vacancy);

      await Promise.all(skills.map(async (source, index) => {
        const skillId = await this.connection.queryAsync({
          sql: `SELECT id FROM skills
                WHERE name = ?`,
          values: [skills[index].name],
        });
        await this.connection.queryAsync({
          sql: `INSERT INTO vacancy_has_skills (skill_id, vacancy_id, weight)
              VALUES (?, ?, ?)`,
          values: [skillId[0].id, id, skills[index].weight],
        });
      }));

      await this.connection.commit();
      return id;
    } catch (err) {
      await this.connection.rollback();
      throw err;
    }
  }

  async readOne(id) {
    try {
      await this.connection.beginTransactionAsync();
      const vacancy = await super.readOne(id);

      const [city] = await this.connection.queryAsync({
        sql: `SELECT name FROM cities
              WHERE id = ?`,
        values: [vacancy.city_id],
      });
      vacancy.city = city.name;
      delete vacancy.city_id;

      vacancy.skills = await this.connection.queryAsync({
        sql: `SELECT name,weight FROM vacancy_has_skills v
              INNER JOIN skills s
              ON s.id = v.skill_id
              WHERE vacancy_id = ?`,
        values: [id],
      });

      await this.connection.commit();
      return vacancy;
    } catch (err) {
      return this.connection.rollback(() => {
        throw err;
      });
    }
  }

  async readPage(page = 1) {
    try {
      await this.connection.beginTransactionAsync();

      const fields = `${this.table}.id, ${this.table}.name, description, status, cities.name AS city`;
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
      return this.connection.rollback(() => {
        throw err;
      });
    }
  }

  async update(id, vacancy, skills, cityName) {
    try {
      await this.connection.beginTransactionAsync();

      const [city] = await this.connection.queryAsync({
        sql: 'SELECT id FROM cities WHERE name = ?',
        values: [cityName],
      });

      vacancy.city_id = city.id;

      await this.connection.queryAsync({
        sql: `DELETE FROM vacancy_has_skills
              WHERE vacancy_id = ?`,
        values: [id],
      });

      await super.update(id, vacancy);

      await Promise.all(skills.map(async (source, index) => {
        const skillsId = await this.connection.queryAsync({
          sql: `SELECT id FROM skills
                WHERE name = ?`,
          values: [skills[index].name],
        });
        await this.connection.queryAsync({
          sql: `INSERT INTO vacancy_has_skills (skill_id, vacancy_id, weight)
                VALUES (?, ?, ?)`,
          values: [skillsId[0].id, id, skills[index].weight],
        });
      }));

      await this.connection.commit();
      return null;
    } catch (err) {
      await this.connection.rollback();
      throw err;
    }
  }
}

module.exports = Vacancies;
