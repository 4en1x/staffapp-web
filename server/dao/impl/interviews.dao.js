const BasicDAO = require('../basic.dao');
const FeedbacksDAO = require('./feedbacks.dao');
const CandidatesDAO = require('./candidates.dao');
const FeedbackFieldsDAO = require('./feedbackfields.dao');
const NotificationsDAO = require('./notifications.dao');
const { createMessages } = require('../../services/notifications.service');
const { addEvent, sendEmail } = require('../../services/google.service');
const UsersDAO = require('./users.dao');

const getHiringsDAO = require.bind(null, './hirings.dao');

class InterviewsDAO extends BasicDAO {
  constructor(connection) {
    super('interviews', connection);
  }

  /**
   * @returns {InterviewsDAO}
   */
  static get instance() {
    return InterviewsDAO._instance || (InterviewsDAO._instance = new InterviewsDAO());
  }

  /**
   *
   * @param {Object} interview
   * @returns {Promise <Number>}
   */
  async create(interview, user) {
    const superCreate = super.create.bind(this);

    return this.wrapTransaction(async () => {
      const users = interview.users;
      delete interview.users;

      const { candidateId } = await getHiringsDAO().instance.findById(interview.hiringId);

      const fields = interview.fields || [];
      delete interview.fields;

      const interviewId = await superCreate(interview, user);

      const feedback = {
        interviewId,
        candidateId,
        fields,
      };

      await Promise.all(users.map(async (userId) => {
        feedback.userId = userId;
        await FeedbacksDAO.instance.create(feedback);

        const messages = createMessages(userId, interview, interviewId);
        await Promise.all(messages.map(async (message) => {
          await NotificationsDAO.instance.create(message);
        }));

        const email = await UsersDAO.instance.emailById(userId);
        await addEvent(email, interview);
        await sendEmail(email, interview);
      }));

      return interviewId;
    });
  }

  /**
   *
   * @param {Number | String} id
   * @returns {Promise <Object>}
   */
  async findById(id) {
    const interview = await super.findById(id);

    if (interview) {
      interview.feedbacks = await FeedbacksDAO.instance.findByInterview(id);
      interview.candidate = await CandidatesDAO.instance.findByFeedback(interview.feedbacks[0]);
      interview.users = await UsersDAO.instance.findByInterview(id);
      interview.skills = await FeedbackFieldsDAO.instance.findByFeedback(interview.feedbacks[0])
        .then(fields => fields.map(field => field.name));
    }

    return interview;
  }

  /**
   *
   * @param {Number | String} id
   * @param {Number} [page] - default=1
   * @returns {Promise <[Object]>}
   */
  async findAllByUser(id, page = 1) {
    const fields = `${this.tableName}.${this.idField}, type, date, place, c.name, c.surname`;

    const interviews = await this.connection.queryAsync({
      sql: `SELECT ${fields} FROM ${this.tableName}
            INNER JOIN hirings h ON ${this.tableName}.hiring_id = h.id
            INNER JOIN candidates c ON h.candidate_id = c.id
            WHERE h.user_id = ${id} AND h.date_close IS NULL

            UNION

            SELECT ${fields} FROM ${this.tableName}
            INNER JOIN feedbacks f ON f.interview_id = ${this.tableName}.id
            INNER JOIN candidates c ON f.candidate_id = c.id
            WHERE f.user_id = ${id} AND f.status = 0

            ORDER BY date
            LIMIT ?, ?`,
      values: [(page - 1) * this.itemsPerPage, this.itemsPerPage],
    });

    return this.toDAOEntity(interviews);
  }

  /**
   *
   * @param {Number | String} id
   * @param {Number} [page] - default=1
   * @returns {Promise <Object>}
   */
  async findAssignedToUser(id, page) {
    const feedbacksTableName = FeedbacksDAO.instance.tableName;
    const candidatesTableName = CandidatesDAO.instance.tableName;
    const candidatesIdField = CandidatesDAO.instance.idField;

    return super.find({
      fields: `i.${this.idField}, type, date, place, c.name, c.surname`,
      basis: `${feedbacksTableName} f
              INNER JOIN ${this.tableName} i
              ON f.interview_id = i.${this.idField}
              INNER JOIN ${candidatesTableName} c
              ON f.candidate_id = c.${candidatesIdField}`,
      condition: 'WHERE f.user_id = ? AND f.status = 0',
      order: 'ORDER BY date',
      page,
      amount: this.itemsPerPage,
      values: [id],
    });
  }

  /**
   *
   * @param {Number | String} id
   * @param {Number} [page] - default=1
   * @returns {Promise <[Object]>}
   */
  async findCreatedByUser(id, page) {
    const candidatesTableName = CandidatesDAO.instance.tableName;
    const candidatesIdField = CandidatesDAO.instance.idField;

    return super.find({
      fields: `i.${this.idField}, type, date, place, c.name, c.surname`,
      basis: `${this.tableName} i
              INNER JOIN hirings h
              ON i.hiring_id = h.id
              INNER JOIN ${candidatesTableName} c
              ON h.candidate_id = c.${candidatesIdField}`,
      condition: 'WHERE h.user_id = ? AND h.date_close IS NULL',
      order: 'ORDER BY date',
      page,
      amount: this.itemsPerPage,
      values: [id],
    });
  }

  /**
   *
   * @param {Number | String} id
   * @returns {Promise <[Object]>}
   */
  async findByHiring(id) {
    return super.find({
      fields: `${this.tableName}.${this.idField}, type, date, place`,
      condition: `WHERE ${this.tableName}.hiring_id = ?`,
      order: 'ORDER BY date',
      values: [id],
    });
  }
}

module.exports = InterviewsDAO;
