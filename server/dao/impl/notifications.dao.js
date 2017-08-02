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
  async findByUser(id, page, dateFrom, dateTo) {
    console.log(dateTo);
    console.log(dateFrom);
    const resources = await super.find({
      fields: `${this.idField}, text, interview_id`,
      page,
      condition: `WHERE user_id=${id} AND (status=1 OR (date>="${dateFrom}" AND date<="${dateTo}" AND status=0))`,
    });

    return resources;
  }

  /**
   * @param {Number | String} id - user id,
   * @returns {Promise <Object>}
   */
  async findById(id) {
    const notification = await super.findById(id, `${this.idField}, text, interview_id`);
    return notification;
  }
}

module.exports = NotificationsDAO;
