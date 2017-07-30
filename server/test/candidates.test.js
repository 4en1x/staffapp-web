const Bluebird = require('bluebird');
const connection = Bluebird.promisifyAll(require('../dao/connection/connect'));
const readFileAsync = Bluebird.promisify(require('fs').readFile);
const app = require('./app-test');
const req = require('superagent').agent();
const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
const defaultUrl = require('../config').web.backendOrigin;

const expect = chai.expect;

let userAuthData;
let adminAuthData;

describe('#Candidates-Api', () => {
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

  describe('#Add candidate', () => {
    it('This test should fail with 403 error because user don\'t have access to this functionality',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/candidates/add-candidate-1.json', 'utf8');
        response = await req
          .post(`${defaultUrl}/candidates`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });

    it('This test should pass, because hr and admin have access for all candidates and can add them',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/candidates/add-candidate-1.json', 'utf8');
        response = await req
          .post(`${defaultUrl}/candidates`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data));
        expect(response.statusCode).to.equal(200);
      });

    it('This test should fail with 500 error because city doesn\'t exist and admin can not add it',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/candidates/add-candidate-2.json', 'utf8');
        response = await req
          .post(`${defaultUrl}/candidates`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(500);
      });

    it('This test should fail with 500 error because skill doesn\'t exist and admin can not add it',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/candidates/add-candidate-3.json', 'utf8');
        response = await req
          .post(`${defaultUrl}/candidates`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(500);
      });

    it('This test should fail with 500 error because field doesn\'t exist and admin can not add it',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/candidates/add-candidate-5.json', 'utf8');
        response = await req
          .post(`${defaultUrl}/candidates`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(500);
      });

    it('This test should fail with 500 error because one of required fields is missing and admin can not add it',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/candidates/add-candidate-4.json', 'utf8');
        response = await req
          .post(`${defaultUrl}/candidates`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(500);
      });
  });

  describe('#Get candidate By Id', () => {
    it('This test should fail with 403 error because user don\'t have access to this functionality',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/candidates/1`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });

    it('This test should pass, because hr and admin have access for all candidates and can read them',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/candidates/check-candidate-1.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/candidates/1`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.shallowDeepEqual(JSON.parse(data));
      });

    it('This test should fail with 404 error : id doesn\'t exist and we can not read it',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/candidates/0`)
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(404);
      });
  });

  describe('#Get all candidates', () => {
    it('This test should fail with 403 error because user don\'t have access to this functionality',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/candidates`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });

    it('This test should pass, because hr and admin have access for all candidates and can read them',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/candidates`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.lengthOf(10);
      });

    it('This test should pass, because hr and admin have access for all candidates and can read them: example with page that doesn\'t exist ( empty array in result)',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/candidates?page=100000000000`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.shallowDeepEqual([]);
      });
  });

  describe('#Delete candidate', () => {
    it('This test should fail with 403 error because user don\'t have access to this functionality',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .delete(`${defaultUrl}/candidates/1`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });

    it('This test should pass, because hr and admin have access for all candidates and can delete them',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .delete(`${defaultUrl}/candidates/1`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
      });

    it('This test should pass, but nothing is change because candidate already deleted and we can not delete him again',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .delete(`${defaultUrl}/candidates/1000`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
      });
  });

  describe('#Update candidate', () => {
    it('This test should fail with 403 error because user don\'t have access to this functionality',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/candidates/update-candidate-set-1.json', 'utf8');
        response = await req
          .patch(`${defaultUrl}/candidates/1`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });

    it('This test should pass, because hr and admin have access for all candidates and can update them',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        let data = await readFileAsync('./test/data/candidates/update-candidate-set-1.json', 'utf8');
        response = await req
          .patch(`${defaultUrl}/candidates/1`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data));
        expect(response.statusCode).to.equal(200);

        data = await readFileAsync('./test/data/candidates/update-candidate-get-1.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/candidates/1`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.shallowDeepEqual(JSON.parse(data));
      });

    it('This test should fail with 500 error because city doesn\'t exist and admin can not update them',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/candidates/update-candidate-set-2.json', 'utf8');
        response = await req
          .patch(`${defaultUrl}/candidates/1`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(500);
      });

    it('This test should fail with 500 error because skill doesn\'t exist and admin can not update them',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/candidates/update-candidate-set-3.json', 'utf8');
        response = await req
          .patch(`${defaultUrl}/candidates/1`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(500);
      });

    it('This test should fail with 500 error because field doesn\'t exist and admin can not update them',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/candidates/update-candidate-set-4.json', 'utf8');
        response = await req
          .patch(`${defaultUrl}/candidates/1`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(500);
      });
  });
});
