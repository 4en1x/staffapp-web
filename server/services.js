const auth = require('./services/auth.service');

function init(app) {
  auth.init(app);
}

module.exports = {
  init,
};
