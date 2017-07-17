const config = require('../config');
const BasicDAO = require('./basic.dao');

class Candidates extends BasicDAO {
  constructor(connection) {
    super('candidates');
    this.top = config.db.itemsPerPage;
    this.connection = connection;
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
      await this.connection.rollbackAsync();
      throw err;
    }
  }

  async readOne(id) {
    try {
      await this.connection.beginTransactionAsync();
      const candidate = await super.readOne(id);

      candidate.links = await this.connection.queryAsync({
        sql: 'SELECT link FROM links WHERE candidate_id = ?',
        values: [candidate.id],
      }).map(name => name.link);

      await this.connection.commit();
      return candidate;
    } catch (err) {
      await this.connection.rollbackAsync();
      throw err;
    }
  }

  async readPage(page = 1) {
    try {
      await this.connection.beginTransactionAsync();

      const fields = `${this.table}.id, ${this.table}.name, surname, primary_skill, status, last_change_date, cities.name AS city`;
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

  async update(id, candidate, links, cityName) {
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
