const Bluebird = require('bluebird');
const connection = Bluebird.promisifyAll(require('./connection/connect'));
const utils = require('../utils');

class BasicDAO {
  constructor(table) {
    this.table = table;
    this.connection = connection;
  }

  async create(resource) {
    try {
      const { insertId } = await connection.queryAsync({
        sql: `INSERT INTO ${this.table} SET ?`,
        values: [resource],
      });
      return insertId;
    } catch (err) {
      throw err;
    }
  }

  async readOne(id, fields = '*') {
    try {
      const [resource] = await connection.queryAsync({
        sql: `SELECT ${fields} FROM ${this.table}
              WHERE id = ?`,
        values: [id],
      });
      return resource;
    } catch (err) {
      throw err;
    }
  }

  async readAll(options) {
    const def = {
      fields: '*',
      addition: '',
      limit: '',
      values: undefined,
    };

    const {
      fields,
      addition,
      limit,
      values,
    } = utils.amplifyParams(options, def);

    try {
      const rows = await connection.queryAsync({
        sql: `SELECT ${fields} FROM ${this.table} ${addition} ${limit}`,
        values,
      });
      return rows;
    } catch (err) {
      throw err;
    }
  }

  async update(id, resource) {
    try {
      await connection.queryAsync({
        sql: `UPDATE ${this.table}
              SET ? WHERE id = ?`,
        values: [resource, id],
      });
    } catch (err) {
      throw err;
    }
  }

  async delete(id) {
    try {
      const data = await connection.queryAsync({
        sql: `DELETE FROM ${this.table} WHERE id = ?`,
        values: [id],
      });
      return data;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = BasicDAO;
