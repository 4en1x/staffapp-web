const auth = require('./routes/auth.route');

function init(app) {
  app.get('/', (req, res) => {
    res.send('Auth page should be here...');
  });

  auth.init(app);

  app.use((req, res) => {
    res.status(404).send('Uh oh! 404:(');
  });
}

module.exports = {
  init,
};
