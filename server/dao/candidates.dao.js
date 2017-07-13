const config = require('../config');
const BasicDAO = require('./basic.dao');

class Candidates extends BasicDAO {
  constructor() {
    super('candidates');
    this.top = config.db.itemsPerPage;
  }

  async create(candidate, links, cityName) {
    try {
      await this.connection.beginTransactionAsync();

      const [city] = await this.connection.queryAsync({
        sql: `SELECT id FROM cities
              WHERE name = ?`,
        values: [cityName],
      });

      candidate.city_id = city.id;
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
      return this.connection.rollback(() => {
        throw err;
      });
    }
  }

  async readOne(id) {
    try {
      await this.connection.beginTransactionAsync();
      const candidate = await super.readOne(id);

      candidate.links = await this.connection.queryAsync({
        sql: `SELECT link FROM links
              WHERE candidate_id = ?`,
        values: [candidate.id],
      }).map(name => name.link);

      await this.connection.commit();
      return candidate;
    } catch (err) {
      return this.connection.rollback(() => {
        throw err;
      });
    }
  }

  async readPage(page = 1) {
    try {
      await this.connection.beginTransactionAsync();

      const fields = 'c.id, c.name, c.surname, c.primary_skill, c.status, c.last_change_date, city.name AS city';
      const joins = 'c LEFT JOIN cities city ON c.city_id = city.id';
      const limit = 'LIMIT ?, ?';
      const values = [(page - 1) * this.top, this.top];

      const rows = await super.readAll({
        fields,
        addition: joins,
        limit,
        values,
      });

      await this.connection.commit();
      return rows;
    } catch (err) {
      return this.connection.rollback(() => {
        throw err;
      });
    }
  }

  async delete(id) {
    try {
      await this.connection.beginTransactionAsync();

      await this.connection.queryAsync({
        sql: `DELETE FROM links
              WHERE candidate_id = ?`,
        values: [id],
      });

      const { affectedRows } = await super.delete(id);
      if (!affectedRows) {
        throw new Error('404');
      }

      await this.connection.commit();
      return null;
    } catch (err) {
      return this.connecton.rollback(() => {
        throw err;
      });
    }
  }

  async update(id, candidate, links, cityName) {
    try {
      await this.connection.beginTransactionAsync();

      const [city] = await this.connection.queryAsync({
        sql: `SELECT id FROM cities
              WHERE name = ?`,
        values: [cityName],
      });

      candidate.city_id = city.id;

      await this.connection.queryAsync({
        sql: `DELETE FROM links
              WHERE candidate_id = ?`,
        values: [id],
      });

      await super.update(id, candidate);
      await Promise.all(links.map(async (link) => {
        await this.connection.queryAsync({
          sql: `INSERT INTO links (link, candidate_id)
                VALUES (?, ?)`,
          values: [link, id],
        });
      }));

      await this.connection.commit();
      return null;
    } catch (err) {
      return this.connection.rollback(() => {
        throw err;
      });
    }
  }
}

module.exports = Candidates;
