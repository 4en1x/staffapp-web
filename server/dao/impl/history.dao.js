const BasicDAO = require('../basic.dao');
const { makeFilterQuery } = require('../utils/filter');
const utils = require('../../utils');

class HistoryDAO extends BasicDAO {
  constructor(connection) {
    super('history', connection);
  }

  /**
   * @returns {HistoryDAO}
   */

  static get instance() {
    return HistoryDAO._instance || (HistoryDAO._instance = new HistoryDAO());
  }

  /**
   *
   * @param {Number} [page] - default=1
   * @returns {Promise <[Object]>}
   */

  async find(page, query) {
    const history = await super.find({
      page,
      amount: this.itemsPerPage,
      condition: makeFilterQuery(query),
      order: 'ORDER BY time DESC',
    });
    return history;
  }

  async addEvent(id, tableName, event, userId, logs = '') {
    if (logs) logs = `Insert data: ${JSON.stringify(logs)} `;
    await super.create({
      foreign_id: id,
      role: tableName,
      event,
      user_id: userId,
      time: utils.date.getSQL(new Date()),
      logs: `Some changes in table ${tableName}: ${event} some data.${logs}`,
    });
  }
}


module.exports = HistoryDAO;
