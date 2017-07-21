const config = require('../config');
const { toCamel, toSnake } = require('convert-keys');
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

      const id = await super.create(toSnake(interview));

      const feedback = {
        interviewId: id,
        candidateId,
      };

      await Promise.all(users.map(async (userId) => {
        feedback.usersId = userId;

        const { insertId } = await this.connection.queryAsync({
          sql: 'INSERT INTO feedbacks SET ?',
          values: [toSnake(feedback)],
        });

        if (!feedbackFields) {
          return;
        }

        await Promise.all(feedbackFields.map(async (field) => {
          field.feedbackId = insertId;
          await this.connection.queryAsync({
            sql: 'INSERT INTO feedback_fields SET ?',
            values: [toSnake(field)],
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
        sql: 'SELECT id FROM feedbacks WHERE feedbacks.interview_id = ?',
        values: [id],
      }).map(idObject => idObject.id);

      interview.skills = await this.connection.queryAsync({
        sql: 'SELECT name FROM feedback_fields WHERE feedback_fields.feedback_id = ?',
        values: [interview.feedbacks[0]],
      });

      interview.users = await this.connection.queryAsync({
        sql: `SELECT users.id name FROM users INNER JOIN feedbacks
              WHERE feedbacks.interview_id = ? AND feedbacks.user_id = users.id`,
        values: [id],
      });
    }

    return toCamel(interview);
  }

  async readAll(id, page = 1) {
    const fields = `${this.table}.id, type, date, place, c.name, c.surname`;

    const interviews = await this.connection.queryAsync({
      sql: `SELECT ${fields} FROM ${this.table}
            INNER JOIN hirings h ON ${this.table}.hiring_id = h.id
            INNER JOIN candidates c ON hiring.candidate_id = c.id
            WHERE h.user_id = ${id} AND h.date_close IS NULL

            UNION

            SELECT ${fields} FROM ${this.table}
            INNER JOIN feedbacks f ON f.interview_id = ${this.table}.id
            INNER JOIN candidates c ON f.candidate_id = c.id
            WHERE f.user_id = ${id} AND f.status = 0

            LIMIT ?, ?`,
      values: [(page - 1) * this.top, this.top],
    });

    return toCamel(interviews);
  }

  async readAssignedTo(id, page = 1) {
    const fields = `${this.table}.id, type, date, place, c.name, c.surname`;
    const joins = `INNER JOIN feedbacks f ON f.interview_id = ${this.table}.id
                   INNER JOIN candidates c ON f.candidate_id = c.id`;
    const where = ' WHERE f.user_id = ? AND f.status = 0';

    const interviews = await super.read({
      fields,
      addition: joins + where,
      page,
      amount: this.top,
      values: [id],
    });

    return interviews;
  }

  async readCreatedBy(id, page = 1) {
    const fields = `${this.table}.${this.idFieldName}, type, date, place, c.name, c.surname`;
    const joins = `INNER JOIN hirings h ON interviews.hiring_id = h.id
                   INNER JOIN candidates c ON hiring.candidate_id = c.id`;
    const where = ' WHERE h.user_id = ? AND h.date_close IS NULL';
    const values = [id];

    const interviews = await super.read({
      fields,
      addition: joins + where,
      page,
      amount: this.top,
      values,
    });

    return interviews;
  }

  async readByHiring(id) {
    const fields = `${this.table}.${this.idFieldName}, type, date, place`;
    const where = `WHERE ${this.table}.hiring_id = ?`;
    const values = [id];

    const interviews = await super.read({
      fields,
      addition: where,
      values,
    });

    return interviews;
  }
}

module.exports = Interviews;
