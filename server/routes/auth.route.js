const controllers = require('../controllers/controllers');

function init(app) {
  app.post('/email', controllers.auth.checkEmail);
  app.post('/login', controllers.auth.login);
  app.post('/logout', controllers.auth.logout);
  app.use(controllers.auth.authCheck);
}

module.exports = {
  init,
};
