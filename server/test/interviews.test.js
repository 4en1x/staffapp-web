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


describe('#Interviews-Api', () => {
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

  describe('#Get Interview by Id', () => {
    it('should pass', async () => {
      let response = await req
        .post('http://localhost:3300/login')
        .send(JSON.parse(adminAuthData));
      expect(response.statusCode).to.equal(200);
      const data = await readFileAsync('./test/data/interviews/check-interviews-1.json', 'utf8');
      response = await req
        .get('http://localhost:3300/interviews/1')
        .set('Accept', 'application/json');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.shallowDeepEqual(JSON.parse(data));
    });

    it('should pass', async () => {
      let response = await req
        .post('http://localhost:3300/login')
        .send(JSON.parse(userAuthData));
      expect(response.statusCode).to.equal(200);
      response = await req
        .get('http://localhost:3300/interviews/1')
        .set('Accept', 'application/json');
      expect(response.statusCode).to.equal(200);
    });

    it('should failed : user dont have access to this interview', async () => {
      let response = await req
        .post('http://localhost:3300/login')
        .send(JSON.parse(userAuthData));
      expect(response.statusCode).to.equal(200);
      response = await req
        .get('http://localhost:3300/interviews/3')
        .set('Accept', 'application/json')
        .ok(res => res.status <= 500);
      expect(response.statusCode).to.equal(403);
    });

    it('should failed : interview doesnt exist', async () => {
      let response = await req
        .post('http://localhost:3300/login')
        .send(JSON.parse(adminAuthData));
      expect(response.statusCode).to.equal(200);
      response = await req
        .get('http://localhost:3300/interviews/4')
        .set('Accept', 'application/json')
        .ok(res => res.status <= 500);
      expect(response.statusCode).to.equal(404);
    });
  });

  describe('#Get List Of Interviews', () => {
    it('should failed : user dont have access', async () => {
      let response = await req
        .post('http://localhost:3300/login')
        .send(JSON.parse(userAuthData));
      expect(response.statusCode).to.equal(200);
      response = await req
        .get('http://localhost:3300/interviews?type=assigned')
        .set('Accept', 'application/json')
        .ok(res => res.status <= 500);
      expect(response.statusCode).to.equal(403);
    });

    it('should failed : user dont have access', async () => {
      let response = await req
        .post('http://localhost:3300/login')
        .send(JSON.parse(userAuthData));
      expect(response.statusCode).to.equal(200);
      response = await req
        .get('http://localhost:3300/interviews?type=all')
        .set('Accept', 'application/json')
        .ok(res => res.status <= 500);
      expect(response.statusCode).to.equal(403);
    });

    it('should pass', async () => {
      let response = await req
        .post('http://localhost:3300/login')
        .send(JSON.parse(userAuthData));
      expect(response.statusCode).to.equal(200);
      const data = await readFileAsync('./test/data/interviews/check-interviews-2.json', 'utf8');
      response = await req
        .get('http://localhost:3300/interviews?type=my')
        .set('Accept', 'application/json');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.shallowDeepEqual(JSON.parse(data));
    });

    it('should failed : user dont have access', async () => {
      let response = await req
        .post('http://localhost:3300/login')
        .send(JSON.parse(adminAuthData));
      expect(response.statusCode).to.equal(200);
      const data = await readFileAsync('./test/data/interviews/check-interviews-3.json', 'utf8');
      response = await req
        .get('http://localhost:3300/interviews?type=assigned')
        .set('Accept', 'application/json');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.shallowDeepEqual(JSON.parse(data));
    });

    it('should failed : user dont have access', async () => {
      let response = await req
        .post('http://localhost:3300/login')
        .send(JSON.parse(adminAuthData));
      expect(response.statusCode).to.equal(200);
      const data = await readFileAsync('./test/data/interviews/check-interviews-4.json', 'utf8');
      response = await req
        .get('http://localhost:3300/interviews?type=all')
        .set('Accept', 'application/json');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.shallowDeepEqual(JSON.parse(data));
    });
  });

  describe('#Update Interview', () => {
    it('should pass', async () => {
      let response = await req
        .post('http://localhost:3300/login')
        .send(JSON.parse(adminAuthData));
      expect(response.statusCode).to.equal(200);
      const data = await readFileAsync('./test/data/interviews/update-interviews-1.json', 'utf8');
      response = await req
        .patch('http://localhost:3300/interviews/1')
        .set('Accept', 'application/json')
        .send(JSON.parse(data));
      expect(response.statusCode).to.equal(200);
    });

    it('should pass', async () => {
      let response = await req
        .post('http://localhost:3300/login')
        .send(JSON.parse(userAuthData));
      expect(response.statusCode).to.equal(200);
      const data = await readFileAsync('./test/data/interviews/check-interviews-5.json', 'utf8');
      response = await req
        .get('http://localhost:3300/interviews?type=my')
        .set('Accept', 'application/json');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.shallowDeepEqual(JSON.parse(data));
    });
  });

  describe('#Delete Interview', () => {
    it('should pass', async () => {
      let response = await req
        .post('http://localhost:3300/login')
        .send(JSON.parse(adminAuthData));
      expect(response.statusCode).to.equal(200);
      response = await req
        .delete('http://localhost:3300/interviews/1')
        .set('Accept', 'application/json')
      expect(response.statusCode).to.equal(200);
    });

    it('should failed : only admin can delete interviews', async () => {
      let response = await req
        .post('http://localhost:3300/login')
        .send(JSON.parse(userAuthData));
      expect(response.statusCode).to.equal(200);
      response = await req
        .delete('http://localhost:3300/interviews/1')
        .set('Accept', 'application/json')
        .ok(res => res.status <= 500);
      expect(response.statusCode).to.equal(403);
    });

    it('should failed : interview dont exist', async () => {
      let response = await req
        .post('http://localhost:3300/login')
        .send(JSON.parse(adminAuthData));
      expect(response.statusCode).to.equal(200);
      response = await req
        .delete('http://localhost:3300/interviews/67')
        .set('Accept', 'application/json')
        .ok(res => res.status <= 500);
      expect(response.statusCode).to.equal(500);
    });
  });
});
