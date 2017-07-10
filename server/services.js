const auth = require('./services/auth');

const services = (app) => {
  auth.init(app);
};

module.exports = services;
