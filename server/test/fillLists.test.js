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

describe('#Fill-Lists Api', () => {
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

  describe('#Get Cities', () => {
    it('This test should pass, because hr and admin have access to get cities',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/fillLists/check-cities.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/cities`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.shallowDeepEqual(JSON.parse(data));
      });

    it('This test should fail with 403 error: user don\'t have access to get cities',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/cities`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });
  });

  describe('#Get Users', () => {
    it('This test should pass, because hr and admin have access to get users',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/users`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.lengthOf(10);
      });

    it('This test should fail with 403 error: user don\'t have access to get users',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/users`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });
  });

  describe('#Get Primary Skills', () => {
    it('This test should pass, because hr and admin have access to get primary skills',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/fillLists/check-primarySkills.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/skills?type=primary`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.shallowDeepEqual(JSON.parse(data));
      });

    it('This test should fail with 403 error: user don\'t have access to get primary skills',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/skills?type=primary`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });
  });

  describe('#Get Secondary Skills', () => {
    it('This test should pass, because hr and admin have access to get secondary skills',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/fillLists/check-secondarySkills.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/skills?type=secondary`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.shallowDeepEqual(JSON.parse(data));
      });

    it('This test should fail with 403 error: user don\'t have access to get secondary skills',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/skills?type=secondary`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });
  });

  describe('#Get Other Skills', () => {
    it('This test should pass, because hr and admin have access to get other skills',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/fillLists/check-otherSkills.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/skills?type=other`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.shallowDeepEqual(JSON.parse(data));
      });

    it('This test should fail with 403 error: user don\'t have access to get other skills',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/skills?type=other`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });
  });

  describe('#Get Hr Skills', () => {
    it('This test should pass, because hr and admin have access to get hr skills',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/skills?type=hr`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.lengthOf(7);
      });

    it('This test should fail with 403 error: user don\'t have access to get hr skills',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/skills?type=hr`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });
  });

  describe('#Get English Levels', () => {
    it('This test should pass, because hr and admin have access to get english levels',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/fillLists/check-englishLevels.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/englishLevels`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.shallowDeepEqual(JSON.parse(data));
      });

    it('This test should fail with 403 error: user don\'t have access to get english levels',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/englishLevels`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });
  });

  describe('#Get Candidate Statuses', () => {
    it('This test should pass, because hr and admin have access to get candidate statuses',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/fillLists/check-candidateStatuses.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/candidateStatuses`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.shallowDeepEqual(JSON.parse(data));
      });

    it('This test should fail with 403 error: user don\'t have access to get candidate statuses',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/candidateStatuses`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });
  });

  describe('#Get Vacancy Statuses', () => {
    it('This test should pass, because hr and admin have access to get vacancy statuses',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/fillLists/check-vacancyStatuses.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/vacancyStatuses`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.shallowDeepEqual(JSON.parse(data));
      });

    it('This test should fail with 403 error: user don\'t have access to get vacancy statuses',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/vacancyStatuses`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });
  });

  describe('#Get Vacancy fillLists', () => {
    it('This test should pass, because hr and admin have access to get vacancy fillLists',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/fillLists/check-vacancyFillLists.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/vacancies/fillLists`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.shallowDeepEqual(JSON.parse(data));
      });

    it('This test should fail with 403 error: user don\'t have access to get vacancy statuses',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/vacancies/fillLists`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });
  });

  describe('#Get Candidate fillLists', () => {
    it('This test should pass, because hr and admin have access to get candidate fillLists',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/fillLists/check-candidateFillLists.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/candidates/fillLists`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.shallowDeepEqual(JSON.parse(data));
      });

    it('This test should fail with 403 error: user don\'t have access to get candidate statuses',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/candidates/fillLists`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });
  });

  describe('#Get Interview fillLists', () => {
    it('This test should pass, because hr and admin have access to get interview fillLists',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/fillLists/check-interviewFillLists.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/interviews/fillLists`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.shallowDeepEqual(JSON.parse(data));
      });

    it('This test should pass, because user have access to get interview fillLists',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/fillLists/check-interviewFillLists.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/interviews/fillLists`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.shallowDeepEqual(JSON.parse(data));
      });
  });
});
