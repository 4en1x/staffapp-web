const mysql = require('mysql');
const config = require('../../config');

const connection = mysql.createConnection({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
  }
});

module.exports = connection;
