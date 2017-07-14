const Bluebird = require('bluebird');
const connection = Bluebird.promisifyAll(require('./connection/connect'));

const top = 10;

async function getMyInterviews(id, numberOfPage = 1) {
  try {
    const rows = await connection.queryAsync({
      sql: `SELECT i.type, i.date, i.place, i.hiring_id, i.id
            FROM interviews i
            INNER JOIN feedback f
            ON f.interviews_id = i.id
            WHERE f.users_id = ?
            AND f.status = 0
            LIMIT ?, ?`,
      values: [id, (numberOfPage - 1) * top, top],
    });
    if (rows.length === 0) return null;
    return rows;
  } catch (err) {
    throw err;
  }
}
async function getAssignedInterviews(id, numberOfPage = 1) {
  try {
    const rows = await connection.queryAsync({
      sql: `SELECT i.type, i.date, i.place, i.hiring_id, i.id
            FROM users u
            INNER JOIN hirings h
              ON h.user_id = u.id
            INNER JOIN interviews i
              ON i.hiring_id = h.id
            WHERE u.id = ?
            AND h.date_close IS NULL
            LIMIT ?, ?`,
      values: [id, (numberOfPage - 1) * top, top],
    });
    if (rows.length === 0) return null;
    return rows;
  } catch (err) {
    throw err;
  }
}
async function getAllInterviews(id, numberOfPage = 1) {
  try {
    const rows = await connection.queryAsync({
      sql: `SELECT i.type, i.date, i.place, i.hiring_id, i.id
            FROM users u
            INNER JOIN hirings h
              ON h.user_id = u.id
            INNER JOIN interviews i
              ON i.hiring_id = h.id
            WHERE u.id = ${id}
            AND h.date_close IS NULL
            UNION
            SELECT i.type, i.date, i.place, i.hiring_id, i.id
            FROM interviews i
            INNER JOIN feedback f
            ON f.interviews_id = i.id
            WHERE f.users_id = ${id}
            AND f.status = 0`,
      values: [(numberOfPage - 1) * top, top],
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
      sql: `SELECT i.type, i.date, i.place, f.id
            FROM interviews i
            INNER JOIN feedback f
            ON f.interviews_id = i.id
            WHERE i.hiring_id = ?`,
      values: [id],
    });
    if (rows.length === 0) return null;
    return rows;
  } catch (err) {
    throw err;
  }
}
async function addInterview(interview, users, candidateId, feedbackFields) {
  try {
    await connection.beginTransactionAsync();
    let data = await connection.queryAsync({
      sql: 'INSERT INTO interviews SET ?',
      values: [interview],
    });
    const interviewsId = data.insertId;
    const feedback = { interviews_id: interviewsId, candidate_id: candidateId };
    await Promise.all(users.map(async (source, index) => {
      feedback.users_id = users[index];
      data = await connection.queryAsync({
        sql: 'INSERT INTO feedback SET ?',
        values: [feedback],
      });
      if (!feedbackFields) return;
      await Promise.all(feedbackFields.map(async (value, i) => {
        feedbackFields[i].feedback_id = data.insertId;
        await connection.queryAsync({
          sql: 'INSERT INTO feedback_fields SET ?',
          values: [feedbackFields[i]],
        });
      }));
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
      sql: `SELECT * FROM interviews
            WHERE id = ?`,
      values: [id],
    });
    return interview[0];
  } catch (err) {
    throw err;
  }
}
async function updateInterview(id, interview) {
  try {
    await connection.queryAsync({
      sql: `UPDATE interviews SET ? 
            WHERE  id = ?`,
      values: [interview, id],
    });
  } catch (error) {
    throw error;
  }
  return null;
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

module.exports = {
  getAssignedInterviews,
  getMyInterviews,
  addInterview,
  getAllInterviews,
  getInterviewsByHiringId,
  getInterviewById,
  deleteInterview,
  updateInterview,
};
