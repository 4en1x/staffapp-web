const Bluebird = require('bluebird');
const connection = Bluebird.promisifyAll(require('./connection/connect'));

async function getHiringsByUserId(id) {
  try {
    const rows = await connection.queryAsync({
      sql: `SELECT * FROM hirings 
            WHERE user_id = ?`,
      values: [id],
    });
    if (rows.length === 0) return null;
    return rows;
  } catch (err) {
    throw err;
  }
}

async function isAnyOpenHiringsForCandidate(id) {
  try {
    const rows = await connection.queryAsync({
      sql: `SELECT * FROM hirings 
            WHERE candidate_id = ?
            AND date_close IS  NULL`,
      values: [id],
    });
    if (rows.length === 0) return false;
    return true;
  } catch (err) {
    throw err;
  }
}
async function addHiring(hiring) {
  try {
    const data = await connection.queryAsync({
      sql: 'INSERT INTO hirings SET ?',
      values: [hiring],
    });
    return data.insertId;
  } catch (err) {
    throw err;
  }
}

async function getHiringsByCandidateId(id) {
  try {
    const rows = await connection.queryAsync({
      sql: `SELECT * FROM hirings 
            WHERE candidate_id = ?`,
      values: [id],
    });
    if (rows.length === 0) return null;
    return rows;
  } catch (err) {
    throw err;
  }
}

async function updateHiring(id, hiring) {
  try {
    await connection.queryAsync({
      sql: `UPDATE hirings SET ?
            WHERE id = ?`,
      values: [hiring, id],
    });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getHiringsByUserId,
  addHiring,
  updateHiring,
  getHiringsByCandidateId,
  isAnyOpenHiringsForCandidate,
};
