const snakeCase = require('lodash.snakecase');
const camelCase = require('lodash.camelcase');

/**
 *  Applies callback function for each key in object (deep).
 * @param {Object} obj
 * @param {Function} cb - callback
 * @returns {Object}
 * */

function deepMapKeys(obj, cb) {
  const isArray = Array.isArray(obj);
  const dest = isArray ? [] : {};

  Object.entries(obj).forEach(([key, value]) => {
    dest[isArray ? key : cb(key)] =
      (value && typeof value === 'object' && !(value instanceof Date)) ?
        deepMapKeys(value, cb) :
        value;
  });
  return dest;
}

const toCamel = obj => deepMapKeys(obj, k => camelCase(k));

const toSnake = obj => deepMapKeys(obj, k => snakeCase(k));

function applyDefault(sourceOptions, defaultOptions) {
  Object.keys(sourceOptions).forEach((key) => {
    if (sourceOptions[key] === undefined) {
      delete sourceOptions[key];
    }
  });
  return Object.assign({}, defaultOptions, sourceOptions);
}

function clearFields(object) {
  return object.map((field) => {
    Object.keys(field).forEach((key) => {
      if (!field[key]) {
        delete field[key];
      }
    });

    return field;
  });
}

/**
 *
 * @param {Date} date
 * @param {Intl.DateTimeFormatOptions} options
 * @returns {String}
 */
function getDateComponent(date, options) {
  return date.toLocaleString('ru-RU', options);
}

/**
 *
 * @param {Date} date
 * @returns {String} - "YYYY-MM-DD HH:mm:ss"
 */
function formatDateToSQLString(date) {
  return date.toLocaleString('ru-RU');
}

/**
 *
 * @param {Date} date
 * @returns {String} - "DD-MM-YYYY"
 */
function formatDateToDateString(date) {
  const year = getDateComponent(date, { year: 'numeric' });
  const month = getDateComponent(date, { month: '2-digit' });
  const day = getDateComponent(date, { day: '2-digit' });
  return `${day}-${month}-${year}`;
}

/**
 *
 * @param {Date} date
 * @returns {String} - "HH:mm"
 */
function formatDateToTimeString(date) {
  const hour = getDateComponent(date, { hour: '2-digit' });
  const minute = getDateComponent(date, { minute: '2-digit' });
  return `${hour}:${minute}`;
}

/**
 * Removes all keys with invalid filter values from filter object.
 * Filter value is invalid if it is not an Object or Array, or it is empty.
 * @param {Object} filter - filter object
 * @returns {Object} - clear copy of filter object
 **/
function clearFilter(filter) {
  const result = Object.assign({}, filter);

  Object.keys(result).forEach((key) => {
    if (result[key] && typeof result[key] === 'object' && Object.keys(result[key]).length) {
      return;
    }

    delete result[key];
  });

  return result;
}

module.exports = {
  applyDefault,
  clearFields,
  toCamel,
  toSnake,
  date: {
    getSQL: formatDateToSQLString,
    getDate: formatDateToDateString,
    getTime: formatDateToTimeString,
  },
  clearFilter,
};
