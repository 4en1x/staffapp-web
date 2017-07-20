const controller = require('../controllers/auth.controller');

function init(app) {
  app.post('/email', controller.checkEmail);
  app.post('/login', controller.login);
  app.post('/logout', controller.logout);
  app.use(controller.authCheck);
}

module.exports = {
  init,
};
