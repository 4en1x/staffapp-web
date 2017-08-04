const Bluebird = require('bluebird');
const connection = Bluebird.promisifyAll(require('../dao/connection/connect'));
const readFileAsync = Bluebird.promisify(require('fs').readFile);
const req = require('superagent').agent();
const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
const app = require('./app-test');
const defaultUrl = require('../config').web.backendOrigin;

let userAuthData;

const expect = chai.expect;

describe('#Notifications Api', () => {
  beforeEach(async () => {
    const data = await readFileAsync('../db/prepare_sql.txt', 'utf8');
    await connection.queryAsync(data);
    userAuthData = await readFileAsync('./test/data/auth/login-1.json', 'utf8');
  });

  afterEach(async () => {
    await req
      .post(`${defaultUrl}/logout`)
      .set('Accept', 'application/json')
      .ok(res => res.status <= 500);
  });

  describe('#Close notification', () => {
    it('This test should pass, because users have access to read and close notifications',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        response = await req
          .patch(`${defaultUrl}/notifications/86`)
          .set('Accept', 'application/json')
          .send({});
        expect(response.statusCode).to.equal(200);
      });
  });

  describe('#Read notifications', () => {
    it('This test should pass, because users have access to read notifications',
      async () => {
        let response = await req
          .post(`${defaultUrl}/login`)
          .send(JSON.parse(userAuthData));
        expect(response.statusCode).to.equal(200);

        const data = await readFileAsync('./test/data/notifications/get-notifications-1.json', 'utf8');
        response = await req
          .get(`${defaultUrl}/notifications`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.shallowDeepEqual(JSON.parse(data));
      });
  });
});
