const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('../router');
const services = require('../services');
const config = require('../config');

const app = express();

const corsOptions = {
  origin: config.web.frontendOrigin,
  optionsSuccessStatus: 200,
};

app.set('port', config.web.port);
app.use(express.static('public'));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

services.init(app);
router.init(app);
app.listen(app.get('port'));

module.exports = app;
