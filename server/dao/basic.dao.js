const { toCamel, toSnake, applyDefault } = require('../utils');
const Bluebird = require('bluebird');
const DEFAULT_CONNECTION = Bluebird.promisifyAll(require('./connection/connect'));
const defaultConfig = require('./configs/history.config.json');

const getHistoryDAO = require.bind(null, './impl/history.dao');

const ITEMS_PER_PAGE = 10;

class BasicDAO {
  /**
   *
   * @param {String} tableName
   * @param {Object} [connection]
   * @param {Number} [itemsPerPage]
   * @param {String} [idField]
   */
  constructor(tableName, connection, itemsPerPage, idField = 'id') {
    this.tableName = tableName;
    this.idField = idField;
    this.connection = connection || DEFAULT_CONNECTION;
    this.itemsPerPage = itemsPerPage || ITEMS_PER_PAGE;
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
  async create(resource, userId) {
    if (this.toDAOEntity(resource)[this.idField]) {
      throw new Error('400');
    }

    const { insertId } = await this.connection.queryAsync({
      sql: `INSERT INTO ${this.tableName} SET ?`,
      values: [this.toDAOEntity(resource)],
    });

    if (!insertId) {
      throw new Error('500');
    }

    if (defaultConfig.create.includes(this.tableName)) {
      await getHistoryDAO().instance.addEvent(insertId, this.tableName, 'create', userId);
    }

    return insertId;
  }

  /**
   *
   * @param {Number | String} id
   * @param {String} [fields] - default '*'
   * @returns {Promise <Object>}
   */
  async findById(id, fields = '*', tableName = this.tableName) {
    const [resource] = await this.connection.queryAsync({
      sql: `SELECT ${fields} FROM ${tableName} WHERE ${this.idField} = ?`,
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
    const opts = applyDefault(options, {
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
      sql: `SELECT ${opts.fields} FROM ${opts.basis} ${opts.condition} ${opts.order} ${limit}`,
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
  async update(id, resource, userId) {
    if (defaultConfig.update.includes(this.tableName)) {
      await getHistoryDAO().instance.addEvent(id, this.tableName, 'update', userId, resource);
    }

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
  async delete(id, userId) {
    if (defaultConfig.delete.includes(this.tableName)) {
      await getHistoryDAO().instance.addEvent(id, this.tableName, 'delete', userId);
    }

    return this.connection.queryAsync({
      sql: `DELETE FROM ${this.tableName} WHERE ${this.idField} = ?`,
      values: [id],
    });
  }

  async wrapTransaction(payload) {
    try {
      await this.connection.beginTransactionAsync();
      const result = await payload();
      await this.connection.commit();
      return result;
    } catch (err) {
      await this.connection.rollbackAsync();
      throw err;
    }
  }
}

module.exports = BasicDAO;
