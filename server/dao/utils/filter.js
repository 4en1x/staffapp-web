const fecha = require('fecha');
const snakeCase = require('lodash.snakecase');

function buidDateFilter(key, value) {
  const dateFrom = fecha.format(value.from ? new Date(value.from) : new Date(0), 'YYYY-MM-DD HH:mm:ss');
  const dateTo = fecha.format(value.to ? new Date(value.to) : new Date(), 'YYYY-MM-DD HH:mm:ss');
  return `${key}>="${dateFrom}" AND ${key}<="${dateTo}"`;
}

function makeCriterion(key, value) {
  switch (key) {
    case 'last_change_date':
    case 'created_date':
    case 'notification_date':
    case 'job_start':
    case 'time':
      return buidDateFilter(key, value);

    case 'english_level':
    case 'role':
    case 'event':
      return `${key} in ("${value.join('","')}")`;

    case 'salary':
      return `${key}>=${value.from} AND ${key}<=${value.to}`;

    case 'city':
      return `ct.name in ("${value.join('","')}")`;

    case 'vacancy_status':
      return `vs.name in ("${value.join('","')}")`;

    case 'candidate_status':
      return `cs.name in ("${value.join('","')}")`;

    case 'primary_skill':
      return `s.name in ("${value.join('","')}")`;
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
