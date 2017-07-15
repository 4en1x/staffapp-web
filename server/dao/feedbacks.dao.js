const BasicDAO = require('./basic.dao');

async function readFields(id) {
  const fields = await this.connection.queryAsync({
    sql: 'SELECT * FROM feedback_fields WHERE feedback_id = ?',
    values: [id],
  });

  return fields;
}

class Feedbacks extends BasicDAO {
  constructor() {
    super('feedbacks');
  }

  async readOne(id) {
    const feedback = await super.readOne(id);
    feedback.fields = await readFields(id);
    return feedback;
  }

  async readOneFromInterviewByUser(interviewId, userId) {
    const [feedback] = await this.connection.queryAsync({
      sql: `SELECT * FROM ${this.table}
            WHERE interview_id = ? AND user_id = ?`;
      values: [interviewId, userId],
    });

    feedback.fields = await readFields(feedback.id);
    return feedback;
  }

  async readAllFromInterview(id) { // TEST IT!
    const feedbacks = await Promise.all(this.connection.queryAsync({
      sql: `SELECT * FROM ${this.table} WHERE interview_id = ?`,
      values: [id],
    }).map(async (feedback) => {
      feedback.fields = await readFields(feedback.id);
      return feedback;
    }));

    return feedbacks;
  }

  async update(id, comment, feedbackFields) {
    try {
      await connection.beginTransactionAsync();
      const feedback = { comment, status: 1 };
      await super.update(id, feedback);

      await Promise.all(feedbackFields.map(async (field) => {
        const id = field.id;
        delete field.id;
        await this.connection.queryAsync({
          sql: 'UPDATE feedback_fields SET ? WHERE id = ?',
          values: [field, id],
        });
      }));

      await this.connection.commit();
      return null;
    } catch (err) {
      return this.connection.rollback(() => {
        throw err;
      });
    }
  }
}

// Feedback controller:
// .map((field) => {
//       Object.keys(field).forEach((key) => {
//         if (field[key] === null) {
//           delete field[key];
//         }
//       });
//       return field;
//     });
