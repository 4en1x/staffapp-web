const BasicDAO = require('./basic.dao');
const { toCamel, toSnake } = require('convert-keys');

async function readFields(id) {
  const fields = await this.connection.queryAsync({
    sql: 'SELECT * FROM feedback_fields WHERE feedback_id = ?',
    values: [id],
  });

  return toCamel(fields);
}

class Feedbacks extends BasicDAO {
  constructor(connection) {
    super('feedbacks');
    this.connection = connection;
  }

  async readOne(id) {
    const feedback = await super.readOne(id);
    feedback.fields = await readFields.bind(this, id);
    return feedback;
  }

  async readOneFromInterviewByUser(interviewId, userId) {
    const [feedback] = toCamel(await this.connection.queryAsync({
      sql: `SELECT * FROM ${this.table}
            WHERE interview_id = ? AND user_id = ?`,
      values: [interviewId, userId],
    }));

    feedback.fields = await readFields.bind(this, feedback.id);
    return feedback;
  }

  async readFromInterview(id) { // TODO: TEST IT!
    const feedbacks = await Promise.all((await super.read({
      addition: 'WHERE interview_id = ?',
      values: [id],
    })).map(async (feedback) => {
      feedback.fields = await readFields.bind(this, feedback.id);
      return feedback;
    }));

    return feedbacks;
  }

  async update(id, comment, feedbackFields) {
    try {
      await this.connection.beginTransactionAsync();
      const feedback = { comment, status: 1 };
      await super.update(id, feedback);

      await Promise.all(feedbackFields.map(async (field) => {
        const fieldId = field.id;
        delete field.id;
        await this.connection.queryAsync({
          sql: 'UPDATE feedback_fields SET ? WHERE id = ?',
          values: [toSnake(field), fieldId],
        });
      }));

      await this.connection.commit();
      return null;
    } catch (err) {
      await this.connection.rollbackAsync();
      throw err;
    }
  }
}

module.exports = Feedbacks;
