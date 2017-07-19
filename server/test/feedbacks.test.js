const Bluebird = require('bluebird');
const connection = Bluebird.promisifyAll(require('../dao/connection/connect'));
const readFileAsync = Bluebird.promisify(require('fs').readFile);
const req = require('superagent').agent();
const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
const app = require('./app-test');

let userAuthData;
let adminAuthData;

const expect = chai.expect;
const { toCamel } = require('convert-keys');


describe('#Feedbacks-Api', () => {
  before(async () => {
    const data = await readFileAsync('../db/prepare_sql.txt', 'utf8');
    await connection.queryAsync(data);
    adminAuthData = await readFileAsync('./test/data/auth/login-1.json', 'utf8');
    userAuthData = await readFileAsync('./test/data/auth/login-3.json', 'utf8');
  });

  afterEach(async () => {
    await req
      .post('http://localhost:3300/logout')
      .set('Accept', 'application/json')
      .ok(res => res.status <= 500);
  });

  describe('#Get Feedback by Id', () => {
    it('should pass', async () => {
      let response = await req
        .post('http://localhost:3300/login')
        .send(JSON.parse(adminAuthData));
      expect(response.statusCode).to.equal(200);
      const data = await readFileAsync('./test/data/feedbacks/check-feedbacks-1.json', 'utf8');
      response = await req
        .get('http://localhost:3300/feedbacks/1')
        .set('Accept', 'application/json');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.shallowDeepEqual(JSON.parse(data));
    });

    it('should failed : user dont have access to this feedback', async () => {
      let response = await req
        .post('http://localhost:3300/login')
        .send(JSON.parse(userAuthData));
      expect(response.statusCode).to.equal(200);
      response = await req
        .get('http://localhost:3300/feedbacks/1')
        .set('Accept', 'application/json')
        .ok(res => res.status <= 500);
      expect(response.statusCode).to.equal(403);
    });

    it('should failed : feedback dont exist', async () => {
      let response = await req
        .post('http://localhost:3300/login')
        .send(JSON.parse(adminAuthData));
      expect(response.statusCode).to.equal(200);
      response = await req
        .get('http://localhost:3300/feedbacks/0')
        .set('Accept', 'application/json');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.shallowDeepEqual({ found: false });
    });
  });

  describe('#Update Feedback', () => {
    it('should pass', async () => {
      let response = await req
        .post('http://localhost:3300/login')
        .send(JSON.parse(adminAuthData));
      expect(response.statusCode).to.equal(200);
      const data = await readFileAsync('./test/data/feedbacks/update-feedbacks-1.json', 'utf8');
      response = await req
        .post('http://localhost:3300/feedbacks/8')
        .set('Accept', 'application/json')
        .send(JSON.parse(data));
      expect(response.statusCode).to.equal(200);
    });

    it('should pass', async () => {
      let response = await req
        .post('http://localhost:3300/login')
        .send(JSON.parse(adminAuthData));
      expect(response.statusCode).to.equal(200);
      const data = await readFileAsync('./test/data/feedbacks/update-feedbacks-1.json', 'utf8');
      response = await req
        .get('http://localhost:3300/feedbacks/8')
        .set('Accept', 'application/json');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.shallowDeepEqual(JSON.parse(data));
    });

    it('should failed : incorrect data', async () => {
      let response = await req
        .post('http://localhost:3300/login')
        .send(JSON.parse(adminAuthData));
      expect(response.statusCode).to.equal(200);
      const data = await readFileAsync('./test/data/feedbacks/update-feedbacks-2.json', 'utf8');
      response = await req
        .post('http://localhost:3300/feedbacks/1')
        .set('Accept', 'application/json')
        .send(JSON.parse(data))
        .ok(res => res.status <= 500);
      expect(response.statusCode).to.equal(500);
    });
  });
});
