const Bluebird = require('bluebird');
const connection = Bluebird.promisifyAll(require('../dao/connection/connect'));
const config = require('../config');

async function clearDb() {
  const data = await connection.queryAsync({
    sql: `SELECT table_name 
          FROM INFORMATION_SCHEMA.tables 
          WHERE table_schema = ? `,
    values: [config.db.database],
  });
  await Promise.all(data.map(async (table) => {
    await connection.queryAsync(`DELETE FROM ${table.table_name}`);
  }));
}

module.exports = clearDb;
