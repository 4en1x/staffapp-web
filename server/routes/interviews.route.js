const controller = require('./../controllers/interviews.controller');

function init(app) {
  app.get('/interviews', controller.readInterviews);
  app.get('/interviews/:id', controller.readInterview);
  app.delete('/interviews/:id', controller.deleteInterview);
  app.patch('/interviews/:id', controller.updateInterview);
}

module.exports = {
  init,
};
