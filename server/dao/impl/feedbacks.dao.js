const BasicDAO = require('../basic.dao');
const FeedbackFieldsDAO = require('./feedbackfields.dao');

class FeedbacksDAO extends BasicDAO {
  constructor(connection) {
    super('feedbacks', connection);
  }

  /**
   * @returns {FeedbacksDAO}
   */
  static get instance() {
    return FeedbacksDAO._instance || (FeedbacksDAO._instance = new FeedbacksDAO());
  }

  /**
   *
   * @param {Object} feedback
   * @returns {Promise <Number>}
   */
  async create(feedback) {
    const superCreate = super.create.bind(this);

    return this.wrapTransaction(async () => {
      const fields = feedback.fields || [];
      delete feedback.fields;

      const id = await superCreate(feedback);

      await Promise.all(fields.map(async (field) => {
        field.feedbackId = id;
        await FeedbackFieldsDAO.instance.create(field);
      }));
    });
  }

  /**
   *
   * @param {Number | String} id
   * @returns {Promise <Object>}
   */
  async findById(id) {
    const feedback = await super.findById(id);

    if (feedback) {
      feedback.fields = await FeedbackFieldsDAO.instance.findByFeedback(id);
    }

    return feedback;
  }

  /**
   *
   * @param {Number | String} id
   * @returns {Promise <[Object]>}
   */
  async findByInterview(id) {
    return super.find({
      fields: `${this.tableName}.${this.idField}`,
      condition: `WHERE ${this.tableName}.interview_id = ?`,
      values: [id],
    }).then(feedbacks => feedbacks.map(feedback => feedback.id));
  }

  /**
   *
   * @param {Number | String} interviewId
   * @param {Number | String} userId
   * @returns {Promise <Object>}
   */
  async findByInterviewAndUser(interviewId, userId) {
    const [feedback] = await super.findById({
      condition: 'WHERE interview_id = ? AND user_id = ?',
      values: [interviewId, userId],
    });

    if (feedback) {
      feedback.fields = await FeedbackFieldsDAO.instance.findByFeedback(feedback.id);
    }

    return feedback;
  }

  /**
   *
   * @param {Number | String} id
   * @param {Object} feedback
   * @returns {Promise <void>}
   */
  async update(id, { comment, fields }) {
    const superUpdate = super.update.bind(this);

    return this.wrapTransaction(async () => {
      const feedback = { comment, status: 1 };
      await superUpdate(id, feedback);

      await Promise.all(fields.map(async (field) => {
        const fieldId = field.id;
        delete field.id;
        await FeedbackFieldsDAO.instance.update(fieldId, field);
      }));
    });
  }
}

module.exports = FeedbacksDAO;
