const auth = require('./auth.service');

function init(app) {
  auth.init(app);
}

module.exports = {
  init,
};
