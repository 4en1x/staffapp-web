const Bluebird = require('bluebird');
const connection = Bluebird.promisifyAll(require('./connection/connect'));

async function getInterviewsByUserId(id) {
  try {
    const rows = await connection.queryAsync({
      sql: `SELECT i.type, i.date, i.place, i.hiring_id, f.id
            FROM interviews i
            INNER JOIN feedback f
            ON f.interviews_id = i.id
            WHERE f.users_id = ?
            AND f.status = 0`,
      values: [id],
    });
    if (rows.length === 0) return null;
    return rows;
  } catch (err) {
    throw err;
  }
}
async function getAssignedInterviews(id) {
  try {
    const rows = await connection.queryAsync({
      sql: `SELECT i.type, i.date, i.place, i.hiring_id, f.id
            FROM users u
            INNER JOIN hirings h
            ON h.user_id = u.id
            INNER JOIN interviews i
            ON i.hiring_id = h.id
            INNER JOIN feedback f
            ON f.interviews_id = i.id
            WHERE f.status = 0`,
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
async function addInterview(interview, users, candidateId) {
  let interviewsId;
  try {
    await connection.beginTransactionAsync();
    const data = await connection.queryAsync({
      sql: 'INSERT INTO interviews SET ?',
      values: [interview],
    });
    interviewsId = data.insertId;
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
      sql: `SELECT * FROM interviews
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
async function updateFeedback(id, comment) {
  try {
    await connection.queryAsync({
      sql: `UPDATE feedback 
            SET comment = ?, status = 1
            WHERE id = ?`,
      values: [comment, id],
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
async function deleteFeedback(id) {
  try {
    await connection.queryAsync({
      sql: `DELETE FROM feedback 
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
  getInterviewsByUserId,
  addInterview,
  getInterviewsByHiringId,
  getInterviewById,
  updateFeedback,
  deleteInterview,
  deleteFeedback,
};

