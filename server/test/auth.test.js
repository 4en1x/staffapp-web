const Bluebird = require('bluebird');
const connection = Bluebird.promisifyAll(require('../dao/connection/connect'));
const readFileAsync = Bluebird.promisify(require('fs').readFile);
const request = require('supertest');
const app = require('./app-test');
const clearDb = require('./clearDb');

describe('#Autentification', () => {
  beforeEach(async () => {
    const data = await readFileAsync('../db/prepare_sql.txt', 'utf8');
    await connection.queryAsync(data);
  });
  afterEach(async () => {
      clearDb();
  });
  describe('#Check email', () => {
    it('should pass', async () => {
      const data = await readFileAsync('./test/data/auth/check-email-1.json', 'utf8');
      request(app).post('/login', data)
        .expect(200);
    });
  });
  describe('#Check email', () => {
    it('should failed', async () => {
      const data = await readFileAsync('./test/data/auth/check-email-2.json', 'utf8');
      request(app).post('/login', data)
        .expect(401);
    });
  });
  describe('#Login', () => {
    it('should pass', async () => {
      const data = await readFileAsync('./test/data/auth/login-1.json', 'utf8');
      request(app).post('/login', data)
        .expect(200);
    });
  });
  describe('#Logout', () => {
    it('should pass', async () => {
      request(app).post('/logout')
        .expect(200);
    });
  });
  describe('#Login', () => {
    it('should failed', async () => {
      const data = await readFileAsync('./test/data/auth/login-2.json', 'utf8');
      request(app).post('/login', data)
        .expect(500);
    });
  });
});
