const express = require('express');
const router = require('../router');
const services = require('../services');
const config = require('../config');

const app = express();

app.set('port', config.web.port);
services.init(app);
router.init(app);

app.listen(app.get('port'));

module.exports = app;
