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

describe('#Feedbacks-Api', () => {
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

  describe('#Get Feedback by Id', () => {
    it('This test should pass, because hr and admin have access for all feedbacks and can read them',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/feedbacks/check-feedbacks-1.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/feedbacks/1`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.shallowDeepEqual(JSON.parse(data));
      });

    it('This test should fail with 403 error: user has access only to this feedbacks, and it\' not him',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/feedbacks/1`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });

    it('This test should fail with 404 error: feedback doesn\'t exist',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/feedbacks/0`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(404);
      });
  });

  describe('#Update Feedback', () => {
    it.only('This test should pass, because hr and admin have access for all feedbacks and can update them',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        let data = await readFileAsync('./test/data/feedbacks/update-feedbacks-1.json', 'utf8');
        response = await req
          .put(`${defaultUrl}/feedbacks/8`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
            .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(200);

        data = await readFileAsync('./test/data/feedbacks/update-feedbacks-1.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/feedbacks/8`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.shallowDeepEqual(JSON.parse(data));
      });


    it('This test should fail with 403 error because admin try to update feedback by incorrect data',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/feedbacks/update-feedbacks-2.json', 'utf8');
        response = await req
          .put(`${defaultUrl}/feedbacks/1`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });
  });
});
