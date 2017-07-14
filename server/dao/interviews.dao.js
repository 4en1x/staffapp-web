const config = require('../config');
const BasicDAO = require('./basic.dao');

class Interviews extends BasicDAO {
  constructor() {
    super('interviews');
    this.top = config.db.itemsPerPage;
  }

  async create(interview, users, candidateId) {
    try {
      await this.connection.beginTransactionAsync();

      const id = await super.create(interview);

      const feedback = {
        interviews_id: id,
        candidate_id: candidateId,
      };

      await Promise.all(users.map(async (userId) => {
        feedback.users_id = userId;
        await connection.queryAsync({
          sql: 'INSERT INTO feedback SET ?',
          values: [feedback],
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

  async readPageToUser(id, page = 1) {
    try {
      const fields = 'type, date, place, hiring_id';
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
      const fields = 'type, date, place';
      const joins = `INNER JOIN hirings h
                     ON interviews.hiring_id = h.id
                     WHERE h.user_id = ?`;
      const limit = '?, ?';
      const values = [id, (page - 1) * this.top, this.top];

      const interviews = await super.readAll({
        fields,
        addition: joins,
        limit,
        values,
      });
    } catch (err) {
      throw err;
    }
  }

  async readPageByHiring(id, page = 1) {
    try {
      const fields = 'type date place';
      const where = 'WHERE interview.hiring_id = ?';
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

async function deleteInterview(id) {
  try {
    await connection.queryAsync({
      sql: `DELETE FROM interviews
            WHERE id = ?`,
      values: [id],
    });
  } catch (error) {
    throw error;
  }
  return null;
}

// async function updateFeedback(id, comment) {
//   try {
//     await connection.queryAsync({
//       sql: `UPDATE feedback
//             SET comment = ?, status = 1
//             WHERE id = ?`,
//       values: [comment, id],
//     });
//   } catch (error) {
//     throw error;
//   }
//   return null;
// }

// async function getInterviewsByHiringId(id) {
//   try {
//     const rows = await connection.queryAsync({
//       sql: `SELECT i.type, i.date, i.place, f.id
//             FROM interviews i
//             INNER JOIN feedback f
//             ON f.interviews_id = i.id
//             WHERE i.hiring_id = ?`,
//       values: [id],
//     });
//     if (rows.length === 0) return null;
//     return rows;
//   } catch (err) {
//     throw err;
//   }
// }

// async function getAssignedInterviews(id) {
//   try {
//     const rows = await connection.queryAsync({
//       sql: `SELECT i.type, i.date, i.place, i.hiring_id, f.id
//             FROM users u
//             INNER JOIN hirings h
//             ON h.user_id = u.id
//             INNER JOIN interviews i
//             ON i.hiring_id = h.id
//             INNER JOIN feedback f
//             ON f.interviews_id = i.id
//             WHERE f.status = 0`,
//       values: [id],
//     });
//     if (rows.length === 0) return null;
//     return rows;
//   } catch (err) {
//     throw err;
//   }
// }

// async function deleteFeedback(id) {
//   try {
//     await connection.queryAsync({
//       sql: `DELETE FROM feedback
//             WHERE id = ?`,
//       values: [id],
//     });
//   } catch (error) {
//     throw error;
//   }
//   return null;
// }

module.exports = Interviews;
