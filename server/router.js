const Router = require('express').Router;
const auth = require('./routes/auth.route');
const candidates = require('./routes/candidates.route');
const hirings = require('./routes/hirings.route');
const interviews = require('./routes/interviews.route');
const feedbacks = require('./routes/feedbacks.route');
const vacancies = require('./routes/vacancies.route');
const search = require('./routes/search.route');

function init(app) {

  const restRoute = new Router();

  auth.init(restRoute);
  restRoute.use('/candidates', candidates);
  restRoute.use('/interviews', interviews);
  restRoute.use('/hirings', hirings);
  restRoute.use('/feedbacks', feedbacks);
  restRoute.use('/vacancies', vacancies);
  restRoute.use('/search', search);

  restRoute.use((req, res) => {
    res.status(404).end();
  });

  app.use('/rest', restRoute);
}

module.exports = {
  init,
};
