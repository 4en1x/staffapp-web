const utils = require('../utils');

class BasicDAO {
  constructor(table) {
    this.table = table;
  }

  async create(resource) {
    const { insertId } = await this.connection.queryAsync({
      sql: `INSERT INTO ${this.table} SET ?`,
      values: [resource],
    });

    return insertId;
  }

  async readOne(id, fields = '*') {
    const [resource] = await this.connection.queryAsync({
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
    } = utils.applyParams(options, def);

    const rows = await this.connection.queryAsync({
      sql: `SELECT ${fields} FROM ${this.table} ${addition} ${limit}`,
      values,
    });

    return rows;
  }

  async update(id, resource) {
    await this.connection.queryAsync({
      sql: `UPDATE ${this.table} SET ? WHERE id = ?`,
      values: [resource, id],
    });
  }

  async delete(id) {
    const { affectedRows } = await this.connection.queryAsync({
      sql: `DELETE FROM ${this.table} WHERE id = ?`,
      values: [id],
    });

    if (!affectedRows) {
      throw new Error('Not exists');
    }
  }
}

module.exports = BasicDAO;
