const Bluebird = require('bluebird');
const connection = Bluebird.promisifyAll(require('../dao/connection/connect'));
const readFileAsync = Bluebird.promisify(require('fs').readFile);
const request = require('supertest');
const app = require('./app-test');
const clearDb = require('./clearDb');
const req = require('superagent').agent();
const expect = require('chai').expect;

describe('#Autentification', () => {
  beforeEach(async () => {
    const data = await readFileAsync('../db/prepare_sql.txt', 'utf8');
    await connection.queryAsync(data);
  });
  afterEach(async () => {
    await clearDb();
  });
  describe('#Check email', () => {
    it('should pass', async () => {
      const data = await readFileAsync('./test/data/auth/check-email-1.json', 'utf8');
      await request(app)
        .post('/email')
        .send(JSON.parse(data))
        .set('Accept', 'application/json')
        .expect(200);
    });
  });
  describe('#Check email', () => {
    it('should failed', async () => {
      const data = await readFileAsync('./test/data/auth/check-email-2.json', 'utf8');
      await request(app)
        .post('/email')
        .send(JSON.parse(data))
        .set('Accept', 'application/json')
        .expect(401);
    });
  });
  describe('#Login and logout', () => {
    it('should pass', async () => {
      const data = await readFileAsync('./test/data/auth/login-1.json', 'utf8');
      let response = await req
        .post('http://localhost:3300/login')
        .set('Accept', 'application/json')
        .send(JSON.parse(data));
      expect(response.statusCode).to.equal(200);
      response = await req
        .post('http://localhost:3300/logout')
        .set('Accept', 'application/json');
      expect(response.statusCode).to.equal(200);
    });
  });
  describe('#Logout', () => {
    it('should failed', async () => {
      await request(app)
        .post('/logout')
        .set('Accept', 'application/json')
        .expect(401);
    });
  });
  describe('#Logout', () => {
    it('should failed', async () => {
      await request(app)
        .post('/logout')
        .set('Accept', 'application/json')
        .expect(401);
    });
  });
  describe('#Login', () => {
    it('should failed', async () => {
      const data = await readFileAsync('./test/data/auth/login-2.json', 'utf8');
      await request(app)
        .post('/login')
        .send(JSON.parse(data))
        .set('Accept', 'application/json')
        .expect(401);
    });
  });
});
