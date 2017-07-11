const Bluebird = require('bluebird');
const connection = Bluebird.promisifyAll(require('./connection/connect'));
const fecha = require('fecha');

const top = 10;

async function addCandidate(candidate) {
  const cloneCandidate = {};
  let links = [];
  let city;
  Object.keys(candidate).forEach((key) => {
    if (key === 'links') links = candidate[key];
    else if (key === 'city') city = candidate[key];
    else cloneCandidate[key] = candidate[key];
  });
  cloneCandidate.created_date = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  cloneCandidate.last_change_date = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  try {
    await connection.beginTransactionAsync();
    let data = await connection.queryAsync({
      sql: `SELECT id FROM cities
            WHERE name = ?`,
      values: [city],
    });
    if (data[0]) cloneCandidate.city_id = data[0].id;
    data = await connection.queryAsync({
      sql: 'INSERT INTO candidates SET ?',
      values: [cloneCandidate],
    });
    const candidateId = data.insertId;
    links.forEach(async (element, index) => {
      await connection.queryAsync({
        sql: `INSERT INTO links (link, candidate_id)
              VALUES (?, ?)`,
        values: [links[index], candidateId],
      });
    });
    await connection.commit();
  } catch (error) {
    return connection.rollback(() => {
      throw error;
    });
  }
  return null;
}

async function candidateById(id) {
  try {
    await connection.beginTransactionAsync();
    const rows = await connection.queryAsync({
      sql: `SELECT * FROM candidates
            WHERE id = ?`,
      values: [id],
    });
    rows[0].links = await connection.queryAsync({
      sql: `SELECT link FROM links
            WHERE candidate_id = ?`,
      values: [rows[0].id],
    }).map(name => name.link);
    await connection.commit();
    return rows[0];
  } catch (error) {
    return connection.rollback(() => {
      throw error;
    });
  }
}

async function candidates(numberOfPage = 1) {
  try {
    await connection.beginTransactionAsync();
    const rows = await connection.queryAsync({
      sql: `SELECT c.id, c.name, c.surname, c.primary_skill, c.status, c.last_change_date, city.name AS city
            FROM candidates c LEFT JOIN cities city
            ON c.city_id = city.id
            LIMIT ?, ?`,
      values: [(numberOfPage - 1) * top, top],
    });
    await connection.commit();
    return rows;
  } catch (error) {
    return connection.rollback(() => {
      throw error;
    });
  }
}

async function deleteCandidate(id) {
  try {
    await connection.beginTransactionAsync();
    await connection.queryAsync({
      sql: `DELETE  FROM links
            WHERE candidate_id = ?`,
      values: [id],
    });
    const data = await connection.queryAsync({
      sql: `DELETE FROM candidates
            WHERE id = ?`,
      values: [id],
    });
    if (data.affectedRows === 0) {
      throw new Error('Already deleted');
    }
    await connection.commit();
  } catch (error) {
    return connection.rollback(() => {
      throw error;
    });
  }
  return null;
}

async function updateCandidate(candidate) {
  try {
    const cloneCandidate = {};
    let links = [];
    let id;
    Object.keys(candidate).forEach((key) => {
      if (key === 'links') links = candidate[key];
      else if (key === 'id')id = candidate[key];
      else cloneCandidate[key] = candidate[key];
    });
    cloneCandidate.last_change_date = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    await connection.beginTransactionAsync();
    await connection.queryAsync({
      sql: `DELETE  FROM links
            WHERE candidate_id = ?`,
      values: [id],
    });
    await connection.queryAsync({
      sql: `UPDATE candidates
            SET ?`,
      values: [cloneCandidate],
    });
    links.forEach(async (element, index) => {
      await connection.queryAsync({
        sql: `INSERT INTO links (link, candidate_id)
              VALUES (?, ?)`,
        values: [links[index], id],
      });
    });
    await connection.commit();
  } catch (error) {
    return connection.rollback(() => {
      throw error;
    });
  }
  return null;
}

module.exports = {
  addCandidate,
  candidateById,
  candidates,
  deleteCandidate,
  updateCandidate,
};
