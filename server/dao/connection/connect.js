const mysql = require('mysql');
const config = require('../../config');

const connection = mysql.createConnection(config.db);

connection.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
  }
});

module.exports = connection;
