const Bluebird = require('bluebird');
const connection = Bluebird.promisifyAll(require('../dao/connection/connect'));
const readFileAsync = Bluebird.promisify(require('fs').readFile);
const app = require('./app-test');
const req = require('superagent').agent();
const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
const defaultUrl = require('../config').web.backendOrigin;

const expect = chai.expect;
const { toCamel } = require('convert-keys');

describe('#Candidates-Api', () => {
  beforeEach(async () => {
    let data = await readFileAsync('../db/prepare_sql.txt', 'utf8');
    await connection.queryAsync(data);
    data = await readFileAsync('./test/data/auth/login-1.json', 'utf8');
    const response = await req
      .post(`${defaultUrl}/login`)
      .send(JSON.parse(data));
    expect(response.statusCode).to.equal(200);
  });

  describe('#Add candidate', () => {
    it('This test should pass, because hr and admin have access for all candidates and can add them',
      async () => {
        const data = await readFileAsync('./test/data/candidates/add-candidate-1.json', 'utf8');
        const response = await req
          .post(`${defaultUrl}/candidates`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data));
        expect(response.statusCode).to.equal(200);
      });

    it('This test should pass, because hr and admin have access for all candidates and can add them (another example with different fields)',
      async () => {
        const data = await readFileAsync('./test/data/candidates/add-candidate-5.json', 'utf8');
        const response = await req
          .post(`${defaultUrl}/candidates`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data));
        expect(response.statusCode).to.equal(200);
      });
    it('This test should fail with 500 error because city doesn\'t exist and admin can not add it',
      async () => {
        const data = await readFileAsync('./test/data/candidates/add-candidate-2.json', 'utf8');
        const response = await req
          .post(`${defaultUrl}/candidates`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(500);
      });

    it('This test should fail with 500 error because field doesn\'t exist and admin can not add it',
      async () => {
        const data = await readFileAsync('./test/data/candidates/add-candidate-3.json', 'utf8');
        const response = await req
          .post(`${defaultUrl}/candidates`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(500);
      });

    it('This test should fail with 500 error because one of required fields is missing and admin can not add it',
      async () => {
        const data = await readFileAsync('./test/data/candidates/add-candidate-4.json', 'utf8');
        const response = await req
          .post(`${defaultUrl}/candidates`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(500);
      });
  });

  describe('#Get candidate By Id', () => {
    it('This test should pass, because hr and admin have access for all candidates and can read them',
      async () => {
        const data = await readFileAsync('./test/data/candidates/check-candidate-1.json', 'utf8');
        const response = await req
          .get(`${defaultUrl}/candidates/1`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.shallowDeepEqual(toCamel(JSON.parse(data)));
      });

    it('This test should fail with 404 error : id doesn\'t exist and we can not read it',
      async () => {
        const response = await req
          .get(`${defaultUrl}/candidates/0`)
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(404);
      });
  });

  describe('#Get all candidates', () => {
    it('This test should pass, because hr and admin have access for all candidates and can read them',
      async () => {
        const data = await readFileAsync('./test/data/candidates/read-page-candidate-1.json', 'utf8');
        const response = await req
          .get(`${defaultUrl}/candidates?p=1`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.shallowDeepEqual(JSON.parse(data));
      });

    it('This test should pass, because hr and admin have access for all candidates and can read them: example with page that doesn\'t exist ( empty array in result)',
      async () => {
        const response = await req
          .get(`${defaultUrl}/candidates?p=100000000000`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.shallowDeepEqual([]);
      });
  });

  describe('#Delete candidate', () => {
    it('This test should pass, because hr and admin have access for all candidates and can delete them',
      async () => {
        const data = await readFileAsync('./test/data/candidates/add-candidate-1.json', 'utf8');
        let response = await req
          .post(`${defaultUrl}/candidates`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data));
        expect(response.statusCode).to.equal(200);

        response = await req
          .delete(`${defaultUrl}/candidates/4`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
      });

    it('This test should fail with 500 error because candidate already deleted and we can not delete him again',
      async () => {
        const response = await req
          .delete(`${defaultUrl}/candidates/5`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(500);
      });
  });

  describe('#Update candidate', () => {
    it('This test should pass, because hr and admin have access for all candidates and can update them',
      async () => {
        let data = await readFileAsync('./test/data/candidates/update-candidate-set-1.json', 'utf8');
        let response = await req
          .patch(`${defaultUrl}/candidates/1`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data));
        expect(response.statusCode).to.equal(200);

        data = await readFileAsync('./test/data/candidates/update-candidate-get-1.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/candidates/1`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.shallowDeepEqual(toCamel(JSON.parse(data)));
      });

    it('This test should pass, because hr and admin have access for all candidates and can update them (just another example with all fields)',
      async () => {
        let data = await readFileAsync('./test/data/candidates/update-candidate-set-2.json', 'utf8');
        let response = await req
          .patch(`${defaultUrl}/candidates/1`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data));
        expect(response.statusCode).to.equal(200);

        data = await readFileAsync('./test/data/candidates/update-candidate-get-2.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/candidates/1`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.shallowDeepEqual(toCamel(JSON.parse(data)));
      });

    it('This test should pass, because hr and admin have access for all candidates and can update them (just another example with only one field)',
      async () => {
        const data = await readFileAsync('./test/data/candidates/update-candidate-set-3.json', 'utf8');
        const response = await req
          .patch(`${defaultUrl}/candidates/1`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(500);
      });
  });
});
