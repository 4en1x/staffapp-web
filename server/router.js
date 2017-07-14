const auth = require('./routes/auth');
<<<<<<< Updated upstream
=======
const hirings = require('./routes/hirings.route');
const interviews = require('./routes/interviews.route');

const router = (app) => {
  app.get('/', (req, res) => {
    res.send('Auth page should be here...');
  });

  auth(app);
  hirings(app);
  interviews(app);

  app.use((req, res) => {
    res.status(404).send('Uh oh! 404:(');
  });
};

module.exports = router;
