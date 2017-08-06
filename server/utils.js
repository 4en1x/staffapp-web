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
  options.hour12 = false;
  options.timeZone = 'UTC';
  return date.toLocaleString([], options);
}

/**
 * Formates Date object to a "YYYY-MM-DD HH:mm:ss" string
 * @param {Date} date
 * @returns {String}
 */
function formatDateToSQLString(date) {
  const year = getDateComponent(date, { year: 'numeric' });
  const month = getDateComponent(date, { month: '2-digit' });
  const day = getDateComponent(date, { day: '2-digit' });
  const hour = getDateComponent(date, { hour: '2-digit' });
  const minute = getDateComponent(date, { minute: '2-digit' });
  const second = getDateComponent(date, { second: '2-digit' });
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

/**
 * Formates Date object to a "DD-MM-YYYY" string
 * @param {Date} date
 * @returns {String}
 */
function formatDateToDateString(date) {
  const year = getDateComponent(date, { year: 'numeric' });
  const month = getDateComponent(date, { month: '2-digit' });
  const day = getDateComponent(date, { day: '2-digit' });
  return `${day}-${month}-${year}`;
}

/**
 * Formates Date object to a "HH:mm" string
 * @param {Date} date
 * @returns {String}
 */
function formatDateToTimeString(date) {
  const hour = `0${getDateComponent(date, { hour: '2-digit' })}`.slice(-2);
  const minute = `0${getDateComponent(date, { minute: '2-digit' })}`.slice(-2);
  return `${hour}:${minute}`;
}

/**
 * Formates Date object to local "HH:mm" string
 * @param {Date} date
 * @returns {String}
 */
function formatDateToLocalTimeString(date) {
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  return `${hours}:${minutes}`;
}

/**
 * Formates Date object to local "DD-MM-YYYY" string
 * @param {Date} date
 * @returns {String}
 */
function formatDateToLocalDateString(date) {
  const day = `0${date.getDay()}`.slice(-2);
  const month = `0${date.getMonth()}`.slice(-2);
  return `${day}.${month}.${date.getFullYear()}`;
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
    getLocalTime: formatDateToLocalTimeString,
    getLocalDate: formatDateToLocalDateString,
  },
  clearFilter,
};
