const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const router = require('./router');
const services = require('./services');
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
console.log(path.join());
app.use(express.static(path.join() + '/client/build'));

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

services.init(app);
router.init(app);


app.listen(app.get('port'), () => {
  console.log(`Exadel.Axel server has been started on port ${app.get('port')}`);
});
