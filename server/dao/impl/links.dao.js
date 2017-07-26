const BasicDAO = require('../basic.dao');

class LinksDAO extends BasicDAO {
  constructor(connection) {
    super('links', connection);
    LinksDAO._instance = this;
  }

  /**
   * @returns {LinksDAO}
   */
  static get instance() {
    return LinksDAO._instance || new LinksDAO();
  }

  /**
   *
   * @param {String} link
   * @param {Number | String} candidateId
   * @returns {Promise <Object>}
   */
  async create(link, candidateId) {
    return this.connection.queryAsync({
      sql: `INSERT INTO ${this.tableName} (link, candidate_id) VALUES (?, ?)`,
      values: [link, candidateId],
    });
  }

  /**
   *
   * @param {Number | String} id - candidate ID
   * @returns {Promise <[Object]>}
   */
  async findByCandidate(id) {
    return super.find({
      condition: 'WHERE candidate_id = ?',
      values: [id],
    });
  }

  /**
   *
   * @param {Number | String} id - candidate ID
   * @returns {Promise <Object>}
   */
  async deleteByCandidate(id) {
    return this.connection.queryAsync({
      sql: `DELETE FROM ${this.tableName} WHERE candidate_id = ?`,
      values: [id],
    });
  }
}

module.exports = LinksDAO;
