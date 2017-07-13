function amplifyParams(src, def) {
  const result = {};
  Object.keys(def).forEach((param) => {
    if (!Object.prototype.hasOwnProperty.call(src, param)) {
      result[param] = def[param];
      return;
    }
    result[param] = src[param];
  });
  return result;
}

module.exports = {
  amplifyParams,
};
