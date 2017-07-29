const BasicDAO = require('../basic.dao');
const InterviewsDAO = require('./interviews.dao');
const FeedbacksDAO = require('./feedbacks.dao');
const { addInterviewsToHiring } = require('../../services/hirings.service');

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
    const hirings = await super.find({
      condition: 'WHERE user_id = ?',
      order: 'ORDER BY -date_close, -date_open',
      values: [id],
    });
    await Promise.all(hirings.map(async (hiring) => {
      hiring.interviews = await addInterviewsToHiring(hiring.id);
    }));
    return hirings;
  }

  /**
   *
   * @param {Number | String} id
   * @returns {Promise <[Object]>}
   */
  async findByCandidate(id) {
    const hirings = await super.find({
      condition: 'WHERE candidate_id = ?',
      order: 'ORDER BY -date_close, -date_open',
      values: [id],
    });
    await Promise.all(hirings.map(async (hiring) => {
      hiring.interviews = await addInterviewsToHiring(hiring.id);
    }));
    return hirings;
  }
}

module.exports = HiringsDAO;
