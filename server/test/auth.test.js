const Bluebird = require('bluebird');
const connection = Bluebird.promisifyAll(require('../dao/connection/connect'));
const readFileAsync = Bluebird.promisify(require('fs').readFile);
const app = require('./app-test');
const req = require('superagent').agent();
const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
const defaultUrl = require('../config').web.backendOrigin;

const expect = chai.expect;

describe('#Autentification', () => {
  beforeEach(async () => {
    const data = await readFileAsync('../db/prepare_sql.txt', 'utf8');
    await connection.queryAsync(data);
  });

  describe('#Get main page', () => {
    it('should pass', async () => {
      const response = await req
        .get(`${defaultUrl}`)
        .set('Accept', 'application/json');
      expect(response.statusCode).to.equal(200);
    });
  });

  describe('#Get any page without authentication', () => {
    it('should failed with 401 error', async () => {
      const response = await req
        .get(`${defaultUrl}/hirings`)
        .set('Accept', 'application/json')
        .ok(res => res.status <= 500);
      expect(response.statusCode).to.equal(401);
    });
  });

  describe('#Check email', () => {
    it('should pass', async () => {
      const data = await readFileAsync('./test/data/auth/check-email-1.json', 'utf8');
      const response = await req
        .post(`${defaultUrl}/email`)
        .send(JSON.parse(data))
        .set('Accept', 'application/json');
      expect(response.statusCode).to.equal(200);
    });
  });

  describe('#Check email', () => {
    it('should failed with 401 error : email doesn\'t exist', async () => {
      const data = await readFileAsync('./test/data/auth/check-email-2.json', 'utf8');
      const response = await req
        .post(`${defaultUrl}/email`)
        .send(JSON.parse(data))
        .set('Accept', 'application/json')
        .ok(res => res.status <= 500);
      expect(response.statusCode).to.equal(401);
    });
  });

  describe('#Login and logout', () => {
    it('should pass', async () => {
      const data = await readFileAsync('./test/data/auth/login-1.json', 'utf8');
      let response = await req
        .post(`${defaultUrl}/login`)
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
    it('should failed with 401 error : session doesn\'t exist', async () => {
      const response = await req
        .post(`${defaultUrl}/logout`)
        .set('Accept', 'application/json')
        .ok(res => res.status <= 500);
      expect(response.statusCode).to.equal(401);
    });
  });

  describe('#Login', () => {
    it('should failed with 401 error : invalid creds', async () => {
      const data = await readFileAsync('./test/data/auth/login-2.json', 'utf8');
      const response = await req
        .post(`${defaultUrl}/login`)
        .send(JSON.parse(data))
        .set('Accept', 'application/json')
        .ok(res => res.status <= 500);
      expect(response.statusCode).to.equal(401);
    });
  });

  describe('#Get page that doesn\'t exist', () => {
    it('should failed with 404 error', async () => {
      const data = await readFileAsync('./test/data/auth/login-1.json', 'utf8');
      let response = await req
        .post(`${defaultUrl}/login`)
        .set('Accept', 'application/json')
        .send(JSON.parse(data));
      expect(response.statusCode).to.equal(200);
      response = await req
        .get(`${defaultUrl}/hiringssss`)
        .set('Accept', 'application/json')
        .ok(res => res.status <= 500);
      expect(response.statusCode).to.equal(404);
    });
  });
});
