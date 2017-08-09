const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/router');
const services = require('./services/services');
const config = require('./config');

const app = express();

const corsOptions = {
  origin: config.web.frontendOrigin,
  optionsSuccessStatus: 200,
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'OPTIONS', 'DELETE', 'PATCH'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Cache-Control', 'Expires'],
};

app.set('port', config.web.port);
app.use(express.static('client/build'));
app.use(express.static('semantic-build'));

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

services.init(app);
router.init(app);

app.use('*', express.static('client/build/index.html'));

app.listen(app.get('port'), () => {
  console.log(`Exadel.Axel server worker has been started on port ${app.get('port')}`);
});
