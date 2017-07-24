const forOwn = require('lodash.forown');
const snakeCase = require('lodash.snakecase');
const camelCase = require('lodash.camelcase');
const isPlainObject = require('lodash.isplainobject');
const isArray = require('lodash.isarray');

function walk(obj, cb) {
  const x = isArray(obj) ? [] : {};

  forOwn(obj, (v, k) => {
    if (isPlainObject(v) || isArray(v) || typeof (v) === typeof ({})
            && v != null && !(v instanceof Date)) {
      v = walk(v, cb);
    }

    x[cb(k)] = v;
  });

  return x;
}

const toCamel = (obj) => {
  const newObj = walk(obj, k => camelCase(k));
  return newObj;
};

const toSnake = (obj) => {
  const newObj = walk(obj, k => snakeCase(k));

  return newObj;
};

function applyDefault(sourceOptions, defaultOptions) {
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
