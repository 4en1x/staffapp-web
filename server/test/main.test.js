const request = require('supertest');
const express = require('express');
const router = require('../router');
const services = require('../services');
const config = require('../config');
const Bluebird = require('bluebird');
const connection = Bluebird.promisifyAll(require('../dao/connection/connect'));
const readFileAsync = Bluebird.promisify(require('fs').readFile);

const app = express();

app.set('port', config.web.port);
services.init(app);
router.init(app);

app.listen(app.get('port'));

describe('My Tests', () => {
  before(async () => {
    const data = await readFileAsync('../db/prepare_sql.txt', 'utf8');
    await connection.queryAsync(data);
  });
  describe('#Autentification', () => {
    it('login', async () => {
      const data = await readFileAsync('./test/data/auth/login.json', 'utf8');
      request(app).post('/login', data)
        .expect(200);
    });
  });
  describe('#Candidates-api', () => {
    it('add candidate', async () => {
      const data = await readFileAsync('./test/data/candidates/add-candidate-1.json', 'utf8');
      request(app).post('/candidates', data)
        .expect(200);
    });
  });

  describe('#Simple selects', () => {
    it('should return smth', (done) => {
      request(app).get('/hirings?id=1')
        .expect(200)
        .expect(/Hello Fine/, done);
    });
  });
});
