const BasicDAO = require('../basic.dao');
const FeedbacksDAO = require('./feedbacks.dao');

class UsersDAO extends BasicDAO {
  constructor(connection) {
    super('users', connection);
    UsersDAO._instance = this;
  }

  /**
   * @returns {UsersDAO}
   */
  static get instance() {
    return UsersDAO._instance || new UsersDAO();
  }

  /**
   *
   * @param {String} email
   * @returns {Promise <Object>}
   */
  async findByEmail(email) {
    const [user] = await super.find({
      condition: 'WHERE email = ?',
      values: [email],
    });

    return user;
  }

  /**
   *
   * @param {String} email
   * @param {String} password
   * @returns {Promise <Object>}
   */
  async findByEmailAndPassword(email, password) {
    const [user] = await super.find({
      condition: 'WHERE email = ? AND password = ?',
      values: [email, password],
    });

    return user;
  }

  /**
   *
   * @param {Number | String} id
   * @returns {Promise <[Object]>}
   */
  async findByInterview(id) {
    const feedbacksTableName = FeedbacksDAO.instance.tableName;

    return super.find({
      fields: `u.${this.idField}`,
      basis: `${this.tableName} u
              INNER JOIN ${feedbacksTableName} f
              ON f.user_id = u.${this.idField}`,
      condition: 'WHERE f.interview_id = ?',
      values: [id],
    });
  }
}

module.exports = UsersDAO;
