const utils = require('../utils');
const { toCamel, toSnake } = require('convert-keys');
const DEFAULT_CONNECTION = require('./connection/connect');

class BasicDAO {
  /**
   *
   * @param {String} tableName
   * @param {String} idField
   * @param {Object} connection
   */
  constructor(tableName, idField = 'id', connection) {
    this.tableName = tableName;
    this.idField = idField;
    this.connection = connection || DEFAULT_CONNECTION;
  }

  toDAOEntity(resource) {
    return toSnake(resource);
  }

  fromDAOEntity(resource) {
    return toCamel(resource);
  }

  /**
   *
   * @param {Object} resource
   * @returns {Promise <Number>}
   */
  async create(resource) {
    if (this.toDAOEntity(resource)[this.idFieldName]) {
      throw new Error('400');
    }

    const { insertId } = await this.connection.queryAsync({
      sql: `INSERT INTO ${this.tableName} SET ?`,
      values: [this.toDAOEntity(resource)],
    });

    if (!insertId) {
      throw new Error('500');
    }

    return insertId;
  }

  /**
   *
   * @param {Number | String} id
   * @param {String} [fields] - default '*'
   * @returns {Promise <Object>}
   */
  async findById(id, fields = '*') {
    const [resource] = await this.connection.queryAsync({
      sql: `SELECT ${fields} FROM ${this.tableName} WHERE ${this.idField} = ?`,
      values: [id],
    });

    if (!resource) {
      throw new Error('404');
    }

    return this.fromDAOEntity(resource);
  }

  /**
   *
   * @param {Object} options
   */
  async find(options) {
    const opts = utils.applyDefault(options, {
      fields: '*',
      basis: this.tableName,
      condition: '',
      order: '',
      page: 1,
      amount: Infinity,
      values: undefined,
    });

    const findAll = '';
    const findPage = `LIMIT ${(opts.page - 1) * opts.amount}, ${opts.amount}`;

    const limit = (opts.amount === Infinity) ? findAll : findPage;

    const resources = await this.connection.queryAsync({
      sql: `SELECT ${opts.fields} FROM ${this.tableName} ${opts.addition} ${opts.order} ${limit}`,
      values: opts.values,
    });

    return this.fromDAOEntity(resources);
  }

  /**
   *
   * @param {Number | String} id
   * @param {Object} resource
   * @returns {Promise <Object>}
   */
  async update(id, resource) {
    return this.connection.queryAsync({
      sql: `UPDATE ${this.tableName} SET ? WHERE ${this.idField} = ?`,
      values: [this.toDAOEntity(resource), id],
    });
  }

  /**
   *
   * @param {Number | String} id
   * @returns {Promise <Object>}
   */
  async delete(id) {
    return this.connection.queryAsync({
      sql: `DELETE FROM ${this.tableName} WHERE ${this.idField} = ?`,
      values: [id],
    });
  }

  async wrapTransaction(payload) {
    try {
      await this.connection.beginTransactionAsync();
      const result = await payload.call(this);
      await this.connection.commit();
      return result;
    } catch (err) {
      await this.connection.rollbackAsync();
      throw err;
    }
  }
}

module.exports = BasicDAO;
