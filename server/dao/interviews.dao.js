const config = require('../config');
const BasicDAO = require('./basic.dao');

class Interviews extends BasicDAO {
  constructor(connection) {
    super('interviews');
    this.top = config.pageSettings.itemsPerPage;
    this.connection = connection;
  }

  async create({ interview, users, candidateId, feedbackFields }) {
    try {
      await this.connection.beginTransactionAsync();

      const id = await super.create(interview);

      const feedback = {
        interviews_id: id,
        candidate_id: candidateId,
      };

      await Promise.all(users.map(async (userId) => {
        feedback.users_id = userId;

        const { insertId } = await this.connection.queryAsync({
          sql: 'INSERT INTO feedbacks SET ?',
          values: [feedback],
        });

        if (!feedbackFields) {
          return;
        }

        await Promise.all(feedbackFields.map(async (field) => {
          field.feedback_id = insertId;
          await this.connection.queryAsync({
            sql: 'INSERT INTO feedback_fields SET ?',
            values: [field],
          });
        }));
      }));

      await this.connection.commit();
      return id;
    } catch (err) {
      await this.connection.rollbackAsync();
      throw err;
    }
  }

  async readOne(id) {
    const interview = await super.readOne(id);

    if (interview) {
      interview.feedbacks = await this.connection.queryAsync({
        sql: 'SELECT id FROM feedbacks WHERE feedback.interview_id = ?',
        values: [id],
      }).map(idObject => idObject.id);
    }

    return interview;
  }

  async readPageAll(id, page = 1) {
    const fields = 'interviews.id, type, date, place';

    const interviews = await this.connection.queryAsync({
      sql: `SELECT ${fields} FROM ${this.table}
            INNER JOIN hirings h ON ${this.table}.hiring_id = h.id
            WHERE h.user_id = ${id} AND h.date_close IS NULL

            UNION

            SELECT ${fields} FROM ${this.table}
            INNER JOIN feedbacks f ON f.interviews_id = interviews.id
            WHERE f.user_id = ${id} AND f.status = 0

            LIMIT ?, ?`,
      values: [(page - 1) * this.top, this.top],
    });

    return interviews;
  }

  async readPageToUser(id, page = 1) {
    const fields = 'interviews.id, type, date, place';
    const joins = 'INNER JOIN feedbacks f ON f.interview_id = interviews.id';
    const where = ' WHERE f.user_id = ? AND f.status = 0';
    const limit = 'LIMIT ?, ?';

    const interviews = await super.readAll({
      fields,
      addition: joins + where,
      limit,
      values: [id, (page - 1) * this.top, this.top],
    });

    return interviews;
  }

  async readPageFromUser(id, page = 1) {
    const fields = 'interviews.id, type, date, place';
    const joins = 'INNER JOIN hirings h ON interviews.hiring_id = h.id';
    const where = ' WHERE h.user_id = ? AND h.date_close IS NULL';
    const limit = 'LIMIT ?, ?';
    const values = [id, (page - 1) * this.top, this.top];

    const interviews = await super.readAll({
      fields,
      addition: joins + where,
      limit,
      values,
    });

    return interviews;
  }

  async readAllByHiring(id) {
    const fields = 'interviews.id, type, date, place';
    const where = 'WHERE interviews.hiring_id = ?';
    const values = [id];

    const interviews = await super.readAll({
      fields,
      addition: where,
      values,
    });

    return interviews;
  }
}

module.exports = Interviews;
