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
};
