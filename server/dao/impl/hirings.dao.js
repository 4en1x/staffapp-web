const BasicDAO = require('../basic.dao');
const InterviewsDAO = require('./interviews.dao');

class HiringsDAO extends BasicDAO {
  constructor(connection) {
    super('hirings', connection);
  }

  /**
   * @returns {HiringsDAO}
   */
  static get instance() {
    return HiringsDAO._instance || (HiringsDAO._instance = new HiringsDAO());
  }

  /**
   *
   * @param {Number | String} id
   * @returns {Promise <Object>}
   */
  async findById(id) {
    const hiring = await super.findById(id);

    if (hiring) {
      hiring.interviews = await InterviewsDAO.instance.findByHiring(id)
        .then(interviews => interviews.map(interview => interview.id));
    }

    return hiring;
  }

  /**
   *
   * @param {Number | String} id
   * @returns {Promise <[Object]>}
   */
  async findByUser(id) {
    return super.find({
      condition: 'WHERE user_id = ?',
      values: [id],
    });
  }

  /**
   *
   * @param {Number | String} id
   * @returns {Promise <[Object]>}
   */
  async findByCandidate(id) {
    return super.find({
      condition: 'WHERE candidate_id = ?',
      values: [id],
    });
  }
}

module.exports = HiringsDAO;
