const controller = require('../controllers/candidates.controller');

function init(app) {
  app.get('/candidates', controller.readCandidates);
  app.get('/candidates/:id', controller.readCandidate);
  app.post('/candidates', controller.writeCandidate);
  app.patch('/candidates/:id', controller.updateCandidate);
  app.delete('/candidates/:id', controller.deleteCandidate);
}

module.exports = {
  init,
};
