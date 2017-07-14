const controller = require('./../controllers/interviews.controller');

const interviews = (app) => {
  app.get('/interviews', controller.readInterviews);
  app.get('/interviews/:id', controller.readInterview);
  app.delete('/interviews/:id', controller.deleteInterview);
  app.patch('/interviews/:id', controller.updateInterview);
};

module.exports = interviews;
