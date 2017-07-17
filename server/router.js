const auth = require('./routes/auth');
const candidates = require('./routes/candidates.route');
const hirings = require('./routes/hirings.route');
const interviews = require('./routes/interviews.route');

const router = (app) => {
  app.get('/', (req, res) => {
    res.send('Auth page should be here...');
  });

  auth(app);
  app.use('/candidates', candidates);
  app.use('/interviews', interviews);
  app.use('/hirings', hirings);

  app.use((req, res) => {
    res.status(404).send('Uh oh! 404:(');
  });
};

module.exports = router;
