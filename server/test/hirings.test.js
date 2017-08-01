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

describe('#Hirings-Api', () => {
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

  describe('#Add hirings', () => {
    it('This test should fail with 403 error because user doesn\'t have access to add hirings',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/hirings/add-hirings-1.json', 'utf8');
        response = await req
          .post(`${defaultUrl}/hirings`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });

    it('This test should pass because admin have access to add hirings',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/hirings/add-hirings-1.json', 'utf8');
        response = await req
          .post(`${defaultUrl}/hirings`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data));
        expect(response.statusCode).to.equal(200);
      });

    it('This test should fail with 422 error candidate user already have hiring and we can not add hiring',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/hirings/add-hirings-5.json', 'utf8');
        response = await req
          .post(`${defaultUrl}/hirings`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(422);
      });

    it('This test should fail with 500 error because candidate id  doesn\'t exist and we can not add hiring',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/hirings/add-hirings-2.json', 'utf8');
        response = await req
          .post(`${defaultUrl}/hirings`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(500);
      });

    it('This test should fail with 500 error because user try to add hiring with missing a required field',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/hirings/add-hirings-3.json', 'utf8');
        response = await req
          .post(`${defaultUrl}/hirings`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(500);
      });

    it('This test should fail with 500 error because because field doesn\'t exist and admin can not add hiring',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/hirings/add-hirings-4.json', 'utf8');
        response = await req
          .post(`${defaultUrl}/hirings`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(500);
      });
  });

  describe('#Get Hirings by Candidate Id', () => {
    it('This test should fail with 403 error because user doesn\'t have access to get hirings',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/hirings?candidate=13`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });

    it('This test should pass because admin have access for all hirings, and he can get this hirings',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/hirings?candidate=13`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.lengthOf(2);
      });

    it('This test should pass but he return empty array, because candidate id doesn\'t exist and we can not get hirings',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/hirings?candidate=13000`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.shallowDeepEqual([]);
      });
  });

  describe('#Get Hirings by User Id', () => {
    it('This test should fail with 403 error because user doesn\'t have access to get hirings',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/hirings?user=1`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });

    it('This test should pass because admin have access for all hirings, and he can get this hirings',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/hirings?user=1`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.lengthOf(12);
      });

    it('This test should pass but he return empty array, because candidate id doesn\'t exist and we can not get hirings',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/hirings?user=13000`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.shallowDeepEqual([]);
      });
  });

  describe('#Get Hiring by Id', () => {
    it('This test should fail with 403 error because user doesn\'t have access to get hiring',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/hirings/1`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });

    it('This test should pass because admin have access for all hirings, and he can get that hiring',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/hirings/check-hirings-1.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/hirings/1`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.shallowDeepEqual(JSON.parse(data));
        expect(response.body.interviews).to.be.an('array');
        expect(response.body.interviews).to.have.lengthOf(2);
      });

    it('This test should fail with 404 error because hiring id doesn\'t exist and we can not get hiring',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .get(`${defaultUrl}/hirings/13000`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(404);
      });
  });

  describe('#Update Hiring', () => {
    it('This test should fail with 403 error because user doesn\'t have access to update hirings',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .patch(`${defaultUrl}/hirings/1`)
          .set('Accept', 'application/json')
          .send({})
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });

    it('This test should pass because admin have access for all hirings, and he can update that hiring',
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
      });

    it('This test should pass but nothing is change, because hiring id doesn\'t exist and we can not update that hiring',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .patch(`${defaultUrl}/hirings/13000`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
      });
  });

  describe('#Delete Hiring', () => {
    it('This test should fail with 403 error because user doesn\'t have access to delete hirings',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .delete(`${defaultUrl}/hirings/1`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(403);
      });

    it('This test should pass because admin have access for all hirings, and he can delete that hiring',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .delete(`${defaultUrl}/hirings/1`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
      });

    it('This test should pass but nothing is change, because hiring id doesn\'t exist and we can not delete that hiring',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(adminAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .delete(`${defaultUrl}/hirings/13000`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
      });
  });
});
