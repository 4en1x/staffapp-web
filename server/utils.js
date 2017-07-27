const snakeCase = require('lodash.snakecase');
const camelCase = require('lodash.camelcase');

/**
 *  Applying callback function for each key in object (deep).
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

module.exports = {
  applyDefault,
  clearFields,
  toCamel,
  toSnake,
};
