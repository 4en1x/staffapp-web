const utils = require('../utils');
const { toCamel, toSnake } = require('convert-keys');

class BasicDAO {
  constructor(table, idFieldName = 'id') {
    this.table = table;
    this.idFieldName = idFieldName;
  }

  async create(resource) {
    if (toSnake(resource)[this.idFieldName]) {
      throw new Error('400');
    }

    const { insertId } = await this.connection.queryAsync({
      sql: `INSERT INTO ${this.table} SET ?`,
      values: [toSnake(resource)],
    });

    return insertId;
  }

  async readOne(id, fields = '*') {
    const [resource] = await this.connection.queryAsync({
      sql: `SELECT ${fields} FROM ${this.table} WHERE ${this.idFieldName} = ?`,
      values: [id],
    });

    return toCamel(resource);
  }

  async read(options) {
    const def = {
      fields: '*',
      addition: '',
      page: 1,
      amount: Infinity,
      values: undefined,
    };

    const {
      fields,
      addition,
      page,
      amount,
      values,
    } = utils.applyDefault(options, def);

    const readAll = '';
    const readPage = `LIMIT ${(page - 1) * amount}, ${amount}`;

    const limit = (amount === Infinity) ? readAll : readPage;

    const resources = toCamel(await this.connection.queryAsync({
      sql: `SELECT ${fields} FROM ${this.table} ${addition} ${limit}`,
      values,
    }));

    return resources;
  }

  async update(id, resource) {
    await this.connection.queryAsync({
      sql: `UPDATE ${this.table} SET ? WHERE ${this.idFieldName} = ?`,
      values: [toSnake(resource), id],
    });
  }

  async delete(id) {
    const { affectedRows } = await this.connection.queryAsync({
      sql: `DELETE FROM ${this.table} WHERE ${this.idFieldName} = ?`,
      values: [id],
    });

    if (!affectedRows) {
      throw new Error('Not exists');
    }
  }
}

module.exports = BasicDAO;
