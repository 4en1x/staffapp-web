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

describe('#Vacancies-Api', () => {
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

  describe('#Add Vacancy', () => {
    it('This test should fail with 403 error because user don\'t have access to this functionality',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .post(`${defaultUrl}/vacancies`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });

    it('This test should pass - admin and hr have access to add vacancies. Also in this test checks that data is correctly saved in db',
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
        const insertId = response.body.id;

        data = await readFileAsync('./test/data/vacancies/check-vacancy-1.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/vacancies/${insertId}`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.shallowDeepEqual(JSON.parse(data));
        expect(response.body.skills).to.be.an('array');
        expect(response.body.skills).to.have.lengthOf(3);
      });

    it('This test should fail with 500 error : admin try add vacancy with skill which don\'t exist',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/vacancies/add-vacancy-2.json', 'utf8');
        response = await req
          .post(`${defaultUrl}/vacancies`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(500);
      });

    it('This test should fail with 500 error : admin try add vacancy with city which don\'t exist',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/vacancies/add-vacancy-3.json', 'utf8');
        response = await req
          .post(`${defaultUrl}/vacancies`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(500);
      });

    it('This test should fail with 500 error : admin try add vacancy with missing a required field',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/vacancies/add-vacancy-4.json', 'utf8');
        response = await req
          .post(`${defaultUrl}/vacancies`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(500);
      });
  });

  describe('#Get Vacancy By Id', () => {
    it('This test should fail with 403 error because user don\'t have access to this functionality',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .post(`${defaultUrl}/vacancies/1`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });
    it('This test should pass - admin and hr have access to get vacancies.Should return vacancy with 3 skills',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/vacancies/check-vacancy-2.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/vacancies/3`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.shallowDeepEqual(JSON.parse(data));
        expect(response.body.skills).to.be.an('array');
        expect(response.body.skills).to.have.lengthOf(3);
      });
    it('This test should fail with 404 error : admin or hr try get vacancy that doen\'t exist',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/vacancies/100`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(404);
      });
  });
  describe('#Get Vacancies', () => {
    it('This test should fail with 403 error because user don\'t have access to this functionality',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/vacancies`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });

    it('This test should pass - admin and hr have access to get vacancies.',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/vacancies`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.lengthOf(8);
      });

    it('This test should pass - admin and hr have access to get vacancies.But this list is empty and test should return empty array',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/vacancies?p=1000`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.shallowDeepEqual([]);
      });
  });
  describe('#Update Vacancy', () => {
    it('This test should fail with 403 error because user don\'t have access to this functionality',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .patch(`${defaultUrl}/vacancies/1`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });

    it('This test should pass - admin and hr have access to update vacancies. Also in this test I check that data is correctly saved in db',
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

        data = await readFileAsync('./test/data/vacancies/check-vacancy-4.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/vacancies/1`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.shallowDeepEqual(JSON.parse(data));
        expect(response.body.skills).to.be.an('array');
        expect(response.body.skills).to.have.lengthOf(3);
      });

    it('This test should fail with 500 error : admin try update vacancy with skill which don\'t exist',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/vacancies/add-vacancy-2.json', 'utf8');
        response = await req
          .post(`${defaultUrl}/vacancies`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(500);
      });

    it('This test should fail with 500 error : admin try update vacancy with city which don\'t exist',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/vacancies/add-vacancy-3.json', 'utf8');
        response = await req
          .post(`${defaultUrl}/vacancies`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(500);
      });
  });
  describe('#Delete Vacancy', () => {
    it('This test should fail with 403 error because user and hr don\'t have access to this functionality',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .delete(`${defaultUrl}/vacancies/1`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });

    it('This test should pass - admin have access to delete vacancies.',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .delete(`${defaultUrl}/vacancies/1`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
      });

    it('This test should pass with no changes -  admin delete vacansy that don\'t exist',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .delete(`${defaultUrl}/vacancies/1000`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
      });
  });
});
