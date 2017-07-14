const Bluebird = require('bluebird');
const connection = Bluebird.promisifyAll(require('./connection/connect'));

async function getMyFeedbackByInterviewId(id, userId) {
  try {
    const myFeedback = await connection.queryAsync({
      sql: `SELECT id FROM feedback
            WHERE interviews_id = ?
            AND users_id = ?`,
      values: [id, userId],
    });
    return myFeedback[0].id;
  } catch (err) {
    throw err;
  }
}
async function getAllFeedbackByInterviewId(id) {
  try {
    const feedbacks = await connection.queryAsync({
      sql: `SELECT  id FROM feedback
            WHERE interviews_id = ?`,
      values: [id],
    }).map(sourse => sourse.id);
    return feedbacks;
  } catch (err) {
    throw err;
  }
}
async function getFeedbackById(id) {
  try {
    const feedback = await connection.queryAsync({
      sql: `SELECT * FROM feedback 
            WHERE id = ?`,
      values: [id],
    });
    const rows = await connection.queryAsync({
      sql: `SELECT * FROM feedback_fields 
            WHERE feedback_id = ?`,
      values: [id],
    }).map((row) => {
      Object.keys(row).forEach((key) => {
        console.log(row[key]);
        if (row[key] === null) delete row[key];
      });
      return row;
    });

    return { feedback, rows };
  } catch (err) {
    throw err;
  }
}
async function updateFeedback(id, comment, feedbackFieldsIds, feedbackFields) {
  try {
    await connection.beginTransactionAsync();
    await connection.queryAsync({
      sql: `UPDATE feedback 
            SET comment = ?, status = 1
            WHERE id = ?`,
      values: [comment, id],
    });
    await Promise.all(feedbackFieldsIds.map(async (sourse, index) => {
      await connection.queryAsync({
        sql: `UPDATE feedback_fields SET ?
              WHERE id = ?`,
        values: [feedbackFields[index], feedbackFieldsIds[index]],
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
  updateFeedback,
  deleteFeedback,
  getAllFeedbackByInterviewId,
  getMyFeedbackByInterviewId,
  getFeedbackById,
};
