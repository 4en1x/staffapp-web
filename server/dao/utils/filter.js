const fecha = require('fecha');

function convertDate(key, value) {
  const dateFrom = fecha.format(new Date(value.from), 'YYYY-MM-DD HH:mm:ss');
  const dateTo = fecha.format(new Date(value.to), 'YYYY-MM-DD HH:mm:ss');

  return `${key}>=${dateFrom} AND ${key}<=${dateTo}`;
}

function makeCriterion(key, value) {
  if (key === 'last_change_date' || key === 'created_date'
    || key === 'notification_date' || key === 'job_start') {
    return convertDate(key, value);
  }

  if (key === 'status' || key === 'english_level') {
    return `${key} in (${value})`;
  }

  if (key === 'city') {
    return `cities.name in (${value})`;
  }

  if (key === 'salary') {
    return `${key}>=${value.from} AND ${key}<=${value.to}`;
  }

  return '';
}

function makeFilterQuery(query) {
  const criteria = Object.keys(query)
    .map((item) => {
      const key = item.replace(/ /g, '_');
      return makeCriterion(key, query[item]);
    })
    .filter(item => item.length);

  if (!criteria.length) {
    return '';
  }

  return `WHERE ${criteria.join(' AND ')}`;
}

module.exports = { makeFilterQuery };
