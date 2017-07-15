const Bluebird = require('bluebird');
const connection = Bluebird.promisifyAll(require('./connection/connect'));
const utils = require('../utils');

class BasicDAO {
  constructor(table) {
    this.table = table;
    this.connection = connection;
  }

  async create(resource) {
    const { insertId } = await connection.queryAsync({
      sql: `INSERT INTO ${this.table} SET ?`,
      values: [resource],
    });

    return insertId;
  }

  async readOne(id, fields = '*') {
    const [resource] = await connection.queryAsync({
      sql: `SELECT ${fields} FROM ${this.table} WHERE id = ?`,
      values: [id],
    });

    return resource;
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

    const rows = await connection.queryAsync({
      sql: `SELECT ${fields} FROM ${this.table} ${addition} ${limit}`,
      values,
    });

    return rows;
  }

  async update(id, resource) {
    await connection.queryAsync({
      sql: `UPDATE ${this.table} SET ? WHERE id = ?`,
      values: [resource, id],
    });
  }

  async delete(id) {
    const data = await connection.queryAsync({
      sql: `DELETE FROM ${this.table} WHERE id = ?`,
      values: [id],
    });

    return data;
  }
}

module.exports = BasicDAO;
