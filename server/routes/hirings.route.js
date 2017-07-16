const controller = require('./../controllers/hirings.controller');

function init(app) {
  app.post('/hirings', controller.writeHiring);
  app.get('/hirings', controller.readHirings);
  app.get('/hirings/:id', controller.readHiring);
  app.patch('/hirings/:id', controller.updateHiring);
  app.delete('/hirings/:id', controller.deleteHiring);
}

module.exports = {
  init,
};
