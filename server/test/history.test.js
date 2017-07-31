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

describe('#History-Api', () => {
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

  describe('#Get First Object in History', () => {
    it('This test should fail with 403 error: user don\'t have access to get history',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/history`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });

    it('This test should pass, because hr and admin have access to get history - check event add candidate',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        let data = await readFileAsync('./test/data/candidates/add-candidate-1.json', 'utf8');
        response = await req
          .post(`${defaultUrl}/candidates`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data));
        expect(response.statusCode).to.equal(200);

        data = await readFileAsync('./test/data/history/check-history-candidates-add.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/history`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body[0]).to.shallowDeepEqual(JSON.parse(data));
      });

    it('This test should pass, because hr and admin have access to get history - check event delete candidate',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .delete(`${defaultUrl}/candidates/1`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/history/check-history-candidates-delete.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/history`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body[0]).to.shallowDeepEqual(JSON.parse(data));
      });

    it('This test should pass, because hr and admin have access to get history - check event update candidate',
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

        data = await readFileAsync('./test/data/history/check-history-candidates-update.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/history`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body[0]).to.shallowDeepEqual(JSON.parse(data));
      });

    it('This test should pass, because hr and admin have access to get history - check event add vacancies',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        let data = await readFileAsync('./test/data/vacancies/add-vacancy-1.json', 'utf8');
        response = await req
          .post(`${defaultUrl}/vacancies`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data));
        expect(response.statusCode).to.equal(200);

        data = await readFileAsync('./test/data/history/check-history-vacancies-add.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/history`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body[0]).to.shallowDeepEqual(JSON.parse(data));
      });

    it('This test should pass, because hr and admin have access to get history - check event delete vacancies',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .delete(`${defaultUrl}/vacancies/1`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/history/check-history-vacancies-delete.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/history`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body[0]).to.shallowDeepEqual(JSON.parse(data));
      });

    it('This test should pass, because hr and admin have access to get history - check event update vacancies',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        let data = await readFileAsync('./test/data/vacancies/update-vacancy-1.json', 'utf8');
        response = await req
          .patch(`${defaultUrl}/vacancies/1`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data));
        expect(response.statusCode).to.equal(200);

        data = await readFileAsync('./test/data/history/check-history-vacancies-update.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/history`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body[0]).to.shallowDeepEqual(JSON.parse(data));
      });

    it('This test should pass, because hr and admin have access to get history - check event add hirings',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        let data = await readFileAsync('./test/data/hirings/add-hirings-1.json', 'utf8');
        response = await req
          .post(`${defaultUrl}/hirings`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data));
        expect(response.statusCode).to.equal(200);

        data = await readFileAsync('./test/data/history/check-history-hirings-add.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/history`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body[0]).to.shallowDeepEqual(JSON.parse(data));
      });

    it('This test should pass, because hr and admin have access to get history - check event delete hirings',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .delete(`${defaultUrl}/hirings/1`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/history/check-history-hirings-delete.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/history`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body[0]).to.shallowDeepEqual(JSON.parse(data));
      });

    it('This test should pass, because hr and admin have access to get history - check event update hirings',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .patch(`${defaultUrl}/hirings/1`)
          .set('Accept', 'application/json')
          .send({});
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/history/check-history-hirings-update.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/history`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body[0]).to.shallowDeepEqual(JSON.parse(data));
      });

    it('This test should pass, because hr and admin have access to get history - check event add interviews',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        let data = await readFileAsync('./test/data/interviews/add-interviews-1.json', 'utf8');
        response = await req
          .post(`${defaultUrl}/interviews`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data));
        expect(response.statusCode).to.equal(200);

        data = await readFileAsync('./test/data/history/check-history-interviews-add.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/history`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body[0]).to.shallowDeepEqual(JSON.parse(data));
      });

    it('This test should pass, because hr and admin have access to get history - check event delete interviews',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .delete(`${defaultUrl}/interviews/1`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/history/check-history-interviews-delete.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/history`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body[0]).to.shallowDeepEqual(JSON.parse(data));
      });

    it('This test should pass, because hr and admin have access to get history - check event update interviews',
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

        data = await readFileAsync('./test/data/history/check-history-interviews-update.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/history`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body[0]).to.shallowDeepEqual(JSON.parse(data));
      });

    it('This test should pass, because hr and admin have access to get history - check event update feedbacks',
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

        data = await readFileAsync('./test/data/history/check-history-feedbacks-update.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/history`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body[0]).to.shallowDeepEqual(JSON.parse(data));
      });
  });
});
