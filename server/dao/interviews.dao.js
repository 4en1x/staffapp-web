const config = require('../config');
const BasicDAO = require('./basic.dao');

class Interviews extends BasicDAO {
  constructor() {
    super('interviews');
    this.top = config.db.itemsPerPage;
  }

  async create(interview, users, candidateId, feedbackFields) {
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
          sql: 'INSERT INTO feedback SET ?',
          values: [feedback],
        });

        if (!feedbackFields) {
          return;
        }

        await Promise.all(feedbackFields.map(async (field) => {
          field.feedback_id = insertId;
          await this.connection.queryAsync({
            sql: 'ISNERT INTO feedback_fields SET ?',
            values: [field],
          });
        }));
      }));

      await this.connection.commit();
      return null;
    } catch (err) {
      return this.connection.rollback(() => {
        throw err;
      });
    }
  }

  // I DON'T LIKE IT
  // async readOne(id) {
  //   try {
  //     const interview = await super.readOne(id);
  //     if (!interview) {
  //       return null;
  //     }
  //     const feedbacks = await this.connection.queryAsync({
  //       sql: `SELECT candidate_id, comment
  //             FROM feedback
  //             WHERE intervies_id = ?`,
  //       values: [id],
  //     });
  //     return { feedbacks, interview };
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  async readOne(id) {
    try {
      const interview = await super.readOne(id);

      interview.feedbacks = await this.connection.queryAsync({
        sql: `SELECT id FROM feedback
              WHERE interview_id = ?`,
        values: [id],
      });

      return interview;
    } catch (err) {
      throw err;
    }
  }

  // I DON'T LIKE IT
  // async readPageToUser(id, page = 1) {
  //   try {
  //     const fields = 'i.type, i.date, i.place, i.hiring_id f.id';
  //     const interviewAbbrev = 'i';
  //     const joins = ' INNER JOIN feedback f ON f.interviews_id = i.id';
  //     const where = ' WHERE f.users_id = ? AND f.status = 0';

  //     const options = {
  //       fields,
  //       addition: interviewAbbrev + joins + where,
  //       values: [id],
  //     };

  //     const interviews = await super.readAll(options);
  //     return interviews;
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  async readPageAll(page = 1) {
    try {
      const interviews = await this.connection.queryAsync({
        sql: `SELECT id, type, date, place
            FROM ${this.table}
            INNER JOIN hirings h
            ON ${this.table}.hiring_id = hirings.id
            WHERE h.user_id = ${id}
            AND h.date_close IS NULL
            UNION
            SELECT id, type, date, place
            FROM ${this.table}
            INNER JOIN feedback f ON f.interviews_id = interviews.id
            WHERE f.users_id = ${id} AND f.status = 0
            LIMIT ?, ?`,
        values: [(page - 1) * this.top, this.top],
      });

      return interviews;
    } catch (err) {
      throw err;
    }
  }

  async readPageToUser(id, page = 1) {
    try {
      const fields = 'id, type, date, place';
      const joins = ' INNER JOIN feedback f ON f.interviews_id = interviews.id';
      const where = ' WHERE f.users_id = ? AND f.status = 0';
      const limit = 'LIMIT ?, ?';

      const interviews = await super.readAll({
        fields,
        addition: joins + where,
        limit,
        values: [id, (page - 1) * this.top, this.top],
      });

      return interviews;
    } catch (err) {
      throw err;
    }
  }

  async readPageFromUser(id, page = 1) { // TEST IT!!!
    try {
      const fields = 'type, date, place, id';
      const joins = `INNER JOIN hirings h
                     ON interviews.hiring_id = h.id`;
      const where = ' WHERE h.user_id = ? AND h.date_close IS NULL';
      const limit = '?, ?';
      const values = [id, (page - 1) * this.top, this.top];

      const interviews = await super.readAll({
        fields,
        addition: joins + where,
        limit,
        values,
      });
    } catch (err) {
      throw err;
    }
  }

  async readPageByHiring(id, page = 1) {
    try {
      const fields = 'id, type, date, place';
      const where = 'WHERE interviews.hiring_id = ?';
      const limit = '?, ?';
      const values = [id, (page - 1) * this.top, this.top];

      const interviews = await super.readAll({
        fields,
        addition: where,
        limit,
        values,
      });

      return interviews;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Interviews;
