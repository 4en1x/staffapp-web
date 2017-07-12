const Bluebird = require('bluebird');
const connection = Bluebird.promisifyAll(require('./connection/connect'));
const fecha = require('fecha');

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
    hiring.date_open = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    const data = await connection.queryAsync({
      sql: 'INSERT INTO hirings SET ?',
      values: [hiring],
    });
    return data.insertId;
  } catch (err) {
    throw err;
  }
}

async function getHiringsByCandadateId(id) {
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

async function closeHiring(id) {
  try {
    const dateClose = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    await connection.queryAsync({
      sql: `UPDATE hirings SET date_close = ?
            WHERE id = ?`,
      values: [dateClose, id],
    });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getHiringsByUserId,
  addHiring,
  closeHiring,
  getHiringsByCandadateId,
  isAnyOpenHiringsForCandidate,
};
