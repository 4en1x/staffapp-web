const Bluebird = require('bluebird');
const connection = Bluebird.promisifyAll(require('./connection/connect'));
const fecha = require('fecha');

async function getInterviewsByUserId(id) {
  try {
    const rows = await connection.queryAsync({
      sql: `SELECT i.type, i.date, i.place, i.hiring_id, i.id
            FROM interviews i
            INNER JOIN interviews_has_users u
            ON u.interviews_id = i.id
            WHERE u.users_id = ?
            AND i.status = 0`,
      values: [id],
    });
    if (rows.length === 0) return null;
    return rows;
  } catch (err) {
    throw err;
  }
}

async function getInterviewsByHiringId(id) {
  try {
    const rows = await connection.queryAsync({
      sql: `SELECT *
            FROM interviews
            WHERE hiring_id = ?`,
      values: [id],
    });
    if (rows.length === 0) return null;
    return rows;
  } catch (err) {
    throw err;
  }
}

async function addInterview(interview, users, candidateId) {
  let interviewsId;
  try {
    await connection.beginTransactionAsync();
    const data = await connection.queryAsync({
      sql: 'INSERT INTO interviews SET ?',
      values: [interview],
    });
    interviewsId = data.insertId;
    await Promise.all(users.map(async (source, index) => {
      await connection.queryAsync({
        sql: `INSERT INTO interviews_has_users (interviews_id, users_id)
              VALUES (?, ?)`,
        values: [interviewsId, users[index]],
      });
    }));
    const feedback = { interviews_id: interviewsId, candidate_id: candidateId };
    await Promise.all(users.map(async (source, index) => {
      feedback.users_id = users[index];
      await connection.queryAsync({
        sql: 'INSERT INTO feedback SET ?',
        values: [feedback],
      });
    }));
    await connection.commit();
  } catch (error) {
    return connection.rollback(() => {
      throw error;
    });
  }
  return null;
}

async function getInterviewById(id) {
  try {
    const interview = await connection.queryAsync({
      sql: `SELECT *
            FROM interviews
            WHERE id = ?`,
      values: [id],
    });
    if (interview.length === 0) return null;
    const feedbacks = await connection.queryAsync({
      sql: `SELECT candidate_id, comment
            FROM feedback
            WHERE interviews_id = ?`,
      values: [id],
    });
    return { feedback: feedbacks, interview: interview[0] };
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getInterviewsByUserId,
  addInterview,
  getInterviewsByHiringId,
  getInterviewById,
};

