const fecha = require('fecha');
const snakeCase = require('lodash.snakecase');

function buidDateFilter(key, value) {
  const dateFrom = fecha.format(new Date(value.from), 'YYYY-MM-DD HH:mm:ss');
  const dateTo = fecha.format(new Date(value.to), 'YYYY-MM-DD HH:mm:ss');

  return `${key}>="${dateFrom}" AND ${key}<="${dateTo}"`;
}

function makeCriterion(key, value) {
  switch (key) {
    case 'last_change_date':
    case 'created_date':
    case 'notification_date':
    case 'job_start':
      return buidDateFilter(key, value);

    case 'status':
    case 'english_level':
    case 'primary_skill':
      return `${key} in (${value})`;

    case 'salary':
      return `${key}>=${value.from} AND ${key}<=${value.to}`;

    case 'city':
      return `cities.name in (${value})`;

    default:
      return '';
  }
}

function makeFilterQuery(query) {
  const criteria = Object.keys(query)
    .map((item) => {
      const key = snakeCase(item);
      return makeCriterion(key, query[item]);
    })
    .filter(item => item.length);

  if (!criteria.length) {
    return '';
  }

  return `WHERE ${criteria.join(' AND ')}`;
}

module.exports = { makeFilterQuery };
