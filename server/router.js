const auth = require('./routes/auth');

const router = (app) => {
  app.get('/', (req, res) => {
    res.send('Auth page should be here...');
  });

  auth(app);

  app.use((req, res) => {
    res.status(404).send('Uh oh! 404:(');
  });
};

module.exports = router;