const BasicDAO = require('../basic.dao');
const UserDAO = require('./users.dao');
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
      order: 'ORDER BY date DESC',
    });
    return history;
  }

  async findById(page, id) {
    const history = await super.find({
      page,
      amount: this.itemsPerPage,
      condition: `WHERE user_id = ${id}`,
      order: 'ORDER BY date DESC',
    });
    return history;
  }

  async findByCandidateId(id) {
    const history = await super.find({
      condition: `WHERE role = "candidates" AND foreign_id = ${id}`,
      order: 'ORDER BY date DESC',
    });
    return history;
  }

  async findByVacancyId(id) {
    const history = await super.find({
      condition: `WHERE role = "vacancies" AND foreign_id = ${id}`,
      order: 'ORDER BY date DESC',
    });
    return history;
  }

  async addEvent(id, tableName, event, userId, logs = '') {
    const userName = await UserDAO.instance.nameById(userId);
    let description = `${userName} make changes in table ${tableName}: ${event} some data.`;
    if (logs) {
      description += ` Here logs: ${JSON.stringify(logs)}`;
    }
    await super.create({
      foreign_id: id,
      role: tableName,
      event,
      user_id: userId,
      date: utils.date.getSQL(new Date()),
      logs: description,
    });
  }
}


module.exports = HistoryDAO;
