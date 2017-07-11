const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./router');
const services = require('./services');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

app.set('port', process.env.PORT || 3300);
app.use(express.static('public'));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

services(app);
router(app);

app.listen(app.get('port'), () => {
  console.log(`Exadel.Axel server has been started on port ${app.get('port')}`);
});
