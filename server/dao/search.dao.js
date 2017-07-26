const { toCamel } = require('../utils');
const Bluebird = require('bluebird');
const connection = Bluebird.promisifyAll(require('./connection/connect'));
const defaultConfig = require('./configs/search.config.json');
const config = require('../config');

const itemsPerPage = config.pageSettings.itemsPerPage;

function makeQuery(table, searchString) {
  const arr = defaultConfig[table].in;
  const queries = searchString.split(' ');
  queries.forEach((query, index) => {
    const q = arr.map(field => `${field} LIKE '%${query}%'`);
    queries[index] = `(${q.join(' OR ')})`;
  });

  return {
    input: queries.join(' AND '),
    output: defaultConfig[table].out.join(','),
  };
}

async function search({ table, searchString }) {
  try {
    const { input, output } = makeQuery(table, searchString);

    const results = await connection.queryAsync(
      `SELECT ${output} FROM ${table} WHERE ${input} LIMIT ${itemsPerPage}`,
    );

    return toCamel(results);
  } catch (err) {
    throw err;
  }
}

module.exports = {
  search,
};
