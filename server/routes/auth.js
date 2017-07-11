const controller = require('../controllers/auth');

const auth = (app) => {
  app.post('/email', controller.checkEmail);
  app.post('/login', controller.login);
  app.post('/logout', controller.logout);
};

module.exports = auth;
