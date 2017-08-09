const Router = require('express').Router;
const auth = require('./auth.route');
const candidates = require('./candidates.route');
const hirings = require('./hirings.route');
const interviews = require('./interviews.route');
const feedbacks = require('./feedbacks.route');
const vacancies = require('./vacancies.route');
const search = require('./search.route');
const history = require('./history.route');
const skills = require('./skills.route');
const cities = require('./cities.route');
const users = require('./users.route');
const englishLevels = require('./englishLevels.route');
const vacancyStatuses = require('./vacancyStatuses.route');
const candidateStatuses = require('./candidateStatuses.route');
const notifications = require('./notifications.route');

function init(app) {
  const restRoute = new Router();

  auth.init(restRoute);
  restRoute.use('/candidates', candidates);
  restRoute.use('/interviews', interviews);
  restRoute.use('/hirings', hirings);
  restRoute.use('/feedbacks', feedbacks);
  restRoute.use('/vacancies', vacancies);
  restRoute.use('/search', search);
  restRoute.use('/history', history);
  restRoute.use('/skills', skills);
  restRoute.use('/cities', cities);
  restRoute.use('/englishLevels', englishLevels);
  restRoute.use('/vacancyStatuses', vacancyStatuses);
  restRoute.use('/candidateStatuses', candidateStatuses);
  restRoute.use('/notifications', notifications);
  restRoute.use('/users', users);

  restRoute.use((req, res) => {
    res.status(404).end();
  });

  app.use('/rest', restRoute);
}

module.exports = {
  init,
};
