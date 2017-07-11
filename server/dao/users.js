const Bluebird = require('bluebird');
const connection = Bluebird.promisifyAll(require('./connection/connect'));

async function getUsers() {
  try {
    const rows = await connection.queryAsync({
      sql: 'SELECT * FROM users',
    });
    return (rows);
  } catch (err) {
    throw err;
  }
}
async function checkUserEmail(email) {
  try {
    const rows = await connection.queryAsync({
      sql: `SELECT * FROM users 
            WHERE email = ? 
            LIMIT 1`,
      values: [email],
    });
    return rows[0];
  } catch (err) {
    throw err;
  }
}
async function checkUser(user) {
  try {
    const rows = await connection.queryAsync({
      sql: `SELECT * FROM users 
            WHERE email = ? AND password = ? 
            LIMIT 1`,
      values: [user.email, user.password],
    });
    return rows[0];
  } catch (err) {
    throw err;
  }
}
async function getUserById(id) {
  try {
    const rows = await connection.queryAsync({
      sql: `SELECT * FROM users
            WHERE id = ?`,
      values: [id],
    });
    return rows[0];
  } catch (err) {
    throw err;
  }
}
async function addUser(user) {
  try {
    await connection.queryAsync({
      sql: 'INSERT INTO users SET ?',
      values: [user],
    });
  } catch (err) {
    throw err;
  }
}
module.exports = {
  getUsers,
  checkUserEmail,
  checkUser,
  getUserById,
  addUser,
};

