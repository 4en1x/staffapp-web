const BasicDAO = require('../basic.dao');

class FeedbackFieldsDAO extends BasicDAO {
  constructor(connection) {
    super('feedback_fields', connection);
    FeedbackFieldsDAO._instance = this;
  }

  /**
   * @returns {FeedbackFieldsDAO}
   */
  static get instance() {
    return FeedbackFieldsDAO._instance || new FeedbackFieldsDAO();
  }

  /**
   *
   * @param {Number | String} id - feedback ID
   * @returns {Promise <[Object]>}
   */
  async findByFeedback(id) {
    return super.find({
      condition: 'WHERE feedback_id = ?',
      values: [id],
    });
  }
}

module.exports = FeedbackFieldsDAO;
