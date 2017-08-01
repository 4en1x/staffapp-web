const Bluebird = require('bluebird');
const connection = Bluebird.promisifyAll(require('../dao/connection/connect'));
const readFileAsync = Bluebird.promisify(require('fs').readFile);
const req = require('superagent').agent();
const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
const app = require('./app-test');
const defaultUrl = require('../config').web.backendOrigin;

let userAuthData;
let adminAuthData;

const expect = chai.expect;

describe('#Interviews-Api', () => {
  beforeEach(async () => {
    const data = await readFileAsync('../db/prepare_sql.txt', 'utf8');
    await connection.queryAsync(data);
    adminAuthData = await readFileAsync('./test/data/auth/login-1.json', 'utf8');
    userAuthData = await readFileAsync('./test/data/auth/login-3.json', 'utf8');
  });

  afterEach(async () => {
    await req
      .post(`${defaultUrl}/logout`)
      .set('Accept', 'application/json')
      .ok(res => res.status <= 500);
  });

  describe('#Add Interview', () => {
    it('This test should fail with 403 error because user doesn\'t have access to add interviews',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/interviews/add-interviews-1.json', 'utf8');
        response = await req
          .post(`${defaultUrl}/interviews`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });

    it('This test should fail with 500 error because user id  doesn\'t exist and we can not add interview',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/interviews/add-interviews-2.json', 'utf8');
        response = await req
          .post(`${defaultUrl}/interviews`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(500);
      });

    it('This test should fail with 500 error because user try to add interview with missing a required field',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/interviews/add-interviews-3.json', 'utf8');
        response = await req
          .post(`${defaultUrl}/interviews`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(500);
      });

    it('This test should fail with 500 error because because field doesn\'t exist and admin can not add interview',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/interviews/add-interviews-4.json', 'utf8');
        response = await req
          .post(`${defaultUrl}/interviews`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(500);
      });

    it('This test should pass because admin have access to add interviews',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/interviews/add-interviews-1.json', 'utf8');
        response = await req
          .post(`${defaultUrl}/interviews`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data));
        expect(response.statusCode).to.equal(200);
      });
  });

  describe('#Get Interview by Id', () => {
    it('This test should pass because admin have access for all interviews, and he can get this interview',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/interviews/check-interviews-1.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/interviews/1`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.shallowDeepEqual(JSON.parse(data));
      });

    it('This test should pass because this interview appointed to this user and user can get it',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/interviews/check-interviews-1.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/interviews/1`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.shallowDeepEqual(JSON.parse(data));
      });

    it('This test should fail with 403 error because user doesn\'t have access to this interview and can\'t get it - he not appointed to it',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/interviews/3`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });

    it('This test should fail with 404 error because interview doesn\'t exist and nobody can get it',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/interviews/333333`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(404);
      });
  });

  describe('#Get List Of Interviews', () => {
    it('This test should fail with 403 error: user don\'t have assigned interviews and he can not get them',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/interviews?type=assigned`)
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });

    it('This test should fail with 403 error: user don\'t have access to all interviews and he can not get them',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData))
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/interviews?type=all`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });

    it('This test should pass : user have access for his interviews and he can get them',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/interviews?type=my`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.lengthOf(1);
      });

    it('This test should pass : admin have access for assigned interviews and he can get them',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/interviews?type=assigned`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.lengthOf(10);
      });

    it('This test should pass: admin have access for all interviews  and he can get them',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/interviews?type=all`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.lengthOf(10);
      });
  });

  describe('#Update Interview', () => {
    it('This test should fail with 403 error: user don\'t have access to update interviews',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/interviews/update-interviews-1.json', 'utf8');
        response = await req
          .patch(`${defaultUrl}/interviews/1`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });

    it('This test should pass, it just simple update and user is admin. After it i check record in db',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        let data = await readFileAsync('./test/data/interviews/update-interviews-1.json', 'utf8');
        response = await req
          .patch(`${defaultUrl}/interviews/1`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data));
        expect(response.statusCode).to.equal(200);

        data = await readFileAsync('./test/data/interviews/check-interviews-3.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/interviews/1`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.shallowDeepEqual(JSON.parse(data));
        expect(response.body.feedbacks).to.be.an('array');
        expect(response.body.feedbacks).to.have.lengthOf(3);
      });
  });

  describe('#Delete Interview', () => {
    it('This test should pass, because user is admin and he can delete interview',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .delete(`${defaultUrl}/interviews/1`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
      });

    it('This test should fail with 403 error: only admin can delete interviews, and current user is not admin',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .delete(`${defaultUrl}/interviews/1`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });

    it('This test should pass, but nothing is change -  interview don\'t exist and nobody can delete it',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .delete(`${defaultUrl}/interviews/6700`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
      });
  });
});
