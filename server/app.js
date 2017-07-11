const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
const services = require('./services');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

services(app);
router(app);

app.listen(app.get('port'), () => {
  console.log(`Exadel.Axel server has been started on port ${app.get('port')}`);
});
