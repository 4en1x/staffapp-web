const BasicDAO = require('../basic.dao');

class NotificationsDAO extends BasicDAO {
  constructor(connection) {
    super('messages', connection);
  }

  /**
   * @returns {NotificationsDAO}
   */
  static get instance() {
    return NotificationsDAO._instance || (NotificationsDAO._instance = new NotificationsDAO());
  }

  /**
   * @param {Number} page,
   * @param {Number | String} id,
   * @param {String | Date} dateFrom,
   * @param {String | Date} dateTo,
   * @returns {Promise <Object>}
   */
  async read(page, id, dateFrom, dateTo) {
    const resources = await super.find({
      page,
      condition: `WHERE user_id=${id} AND date>='${dateFrom}' AND date<='${dateTo}'`,
    });

    return resources;
  }
}

module.exports = NotificationsDAO;
