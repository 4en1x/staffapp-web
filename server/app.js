const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./router');
const services = require('./services');
const config = require('./config');

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

services(app);
router(app);

app.listen(app.get('port'), () => {
  console.log(`Exadel.Axel server has been started on port ${app.get('port')}`);
});
