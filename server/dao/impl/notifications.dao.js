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


  /** Constants * */

  static get READ_MESSAGE_STATUS() {
    return 2;
  }
  static get IMPORTANT_MESSAGE_STATUS() {
    return 1;
  }
  static get REGULAR_MESSAGE_STATUS() {
    return 0;
  }

  /**
   * @param {Number} page,
   * @param {Number | String} id,
   * @param {String | Date} dateFrom,
   * @param {String | Date} dateTo,
   * @returns {Promise <Object>}
   */
  async findByUser(id, page, dateFrom, dateTo) {
    const resources = await super.find({
      fields: `${this.idField}, text, interview_id`,
      page,
      condition: `WHERE user_id=${id} AND (status=${NotificationsDAO.IMPORTANT_MESSAGE_STATUS} OR
                  (date>="${dateFrom}" AND date<="${dateTo}" AND status=${NotificationsDAO.REGULAR_MESSAGE_STATUS}))`,
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

  async close(id, userId) {
    await this.connection.queryAsync({
      sql: `UPDATE ${this.tableName} AS m
            INNER JOIN feedbacks f
              USING (interview_id)
            SET m.status = ?
            WHERE f.id = ? AND m.user_id = ?`,
      values: [NotificationsDAO.READ_MESSAGE_STATUS, id, userId],
    });
  }
}

module.exports = NotificationsDAO;
