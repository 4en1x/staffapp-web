const utils = require('../../utils');
const snakeCase = require('lodash.snakecase');

function buildDateFilter(key, value) {
  const dateFrom = value.from ? utils.date.getSQL(new Date(value.from)) : -Infinity;
  const dateTo = value.to ? utils.date.getSQL(new Date(value.to)) : +Infinity;

  return `${key}>=${dateFrom} AND ${key}<=${dateTo}`;
}

function makeCriterion(key, value) {
  switch (key) {
    case 'last_change_date':
    case 'created_date':
    case 'notification_date':
    case 'job_start':
    case 'time':
      return buildDateFilter(key, value);

    case 'english_level':
    case 'role':
    case 'event':
    case 'city':
    case 'status':
    case 'primary_skill':
      return `${key} in ("${value.join('","')}")`;

    case 'salary':
      return `${key}>=${value.from} AND ${key}<=${value.to}`;

    case 'secondary_skills':
      value = value.map(val => `(${key} LIKE '%${val}%')`);
      return `(${value.join('AND')})`;

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
