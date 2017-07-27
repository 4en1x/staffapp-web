const auth = require('./routes/auth.route');
const candidates = require('./routes/candidates.route');
const hirings = require('./routes/hirings.route');
const interviews = require('./routes/interviews.route');
const feedbacks = require('./routes/feedbacks.route');
const vacancies = require('./routes/vacancies.route');
const search = require('./routes/search.route');

function init(app) {
  app.get('/', (req, res) => {
    res.send('index.html');
  });

  auth.init(app);
  app.use('/candidates', candidates);
  app.use('/interviews', interviews);
  app.use('/hirings', hirings);
  app.use('/feedbacks', feedbacks);
  app.use('/vacancies', vacancies);
  app.use('/search', search);

  app.use((req, res) => {
    res.status(404).end();
  });
}

module.exports = {
  init,
};
