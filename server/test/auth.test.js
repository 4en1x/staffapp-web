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

  describe('#Get any page without authentication', () => {
    it('This test should fail with 401 error because no one can see any page without authorization ',
      async () => {
        const response = await req
          .get(`${defaultUrl}/hirings`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(401);
      });
  });

  describe('#Check email', () => {
    it('This test should pass, this email exists', async () => {
      const data = await readFileAsync('./test/data/auth/check-email-1.json', 'utf8');
      const response = await req
        .post(`${defaultUrl}/email`)
        .send(JSON.parse(data))
        .set('Accept', 'application/json');
      expect(response.statusCode).to.equal(200);
    });

    it('This test should fail with 401 error : email doesn\'t exist',
      async () => {
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
    it('This test should pass: at first we login with ok creds, then logout',
      async () => {
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
    it('That test should fail with 401 error because session doesn\'t exist and user can not logout',
      async () => {
        const response = await req
          .post(`${defaultUrl}/logout`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(401);
      });
  });

  describe('#Login', () => {
    it('This test should fail with 401 error : invalid creds and user can not login',
      async () => {
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
    it('This test should fail with 404 error, because page doesn\'t exist',
      async () => {
        const data = await readFileAsync('./test/data/auth/login-1.json', 'utf8');
        let response = await req
          .post(`${defaultUrl}/login`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/notexist`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(404);
      });
  });
});
