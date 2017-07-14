const auth = require('./routes/auth');
<<<<<<< Updated upstream
=======
const hirings = require('./routes/hirings.route');
const interviews = require('./routes/interviews.route');
>>>>>>> Stashed changes

const router = (app) => {
  app.get('/', (req, res) => {
    res.send('Auth page should be here...');
  });

  auth(app);
<<<<<<< Updated upstream
=======
  hirings(app);
  interviews(app);
>>>>>>> Stashed changes

  app.use((req, res) => {
    res.status(404).send('Uh oh! 404:(');
  });
};

module.exports = router;
