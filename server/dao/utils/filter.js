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
      return `ps.name in ("${value.join('","')}")`;

    case 'secondary_skills':
      return `ss.name in ("${value.join('", "')}") and ss.type='secondary'`;

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
