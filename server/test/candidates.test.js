const Bluebird = require('bluebird');
const connection = Bluebird.promisifyAll(require('../dao/connection/connect'));
const readFileAsync = Bluebird.promisify(require('fs').readFile);
const request = require('supertest');
const req = require('superagent').agent();
const expect = require('chai').expect;

const app = require('./app-test');
const clearDb = require('./clearDb');

describe('Candidates-Api', () => {
  beforeEach(async () => {
    let data = await readFileAsync('../db/prepare_sql.txt', 'utf8');
    await connection.queryAsync(data);
    data = await readFileAsync('./test/data/auth/login-1.json', 'utf8');
    const response = await req
      .post('http://localhost:3300/login')
      .send(JSON.parse(data));
    expect(response.statusCode).to.equal(200);
  });

  afterEach(async () => {
    await clearDb();
  });

  describe('#Add candidate', () => {
    it('should pass', async () => {
      const data = await readFileAsync('./test/data/candidates/add-candidate-1.json', 'utf8');
      const response = await req
        .post('http://localhost:3300/candidates')
        .set('Accept', 'application/json')
        .send(JSON.parse(data));
      expect(response.statusCode).to.equal(200);
    });
  });

  describe('#Add candidate', () => {
    it('should failed(city dont exist)', async () => {
      const data = await readFileAsync('./test/data/candidates/add-candidate-2.json', 'utf8');
      const response = await req
        .post('http://localhost:3300/candidates')
        .set('Accept', 'application/json')
        .send(JSON.parse(data))
        .ok(res => res.status <= 500);
      expect(response.statusCode).to.equal(500);
    });
  });

  describe('#Add candidate', () => {
    it('should failed(field dont exist)', async () => {
      const data = await readFileAsync('./test/data/candidates/add-candidate-3.json', 'utf8');
      const response = await req
        .post('http://localhost:3300/candidates')
        .set('Accept', 'application/json')
        .send(JSON.parse(data))
        .ok(res => res.status <= 500);
      expect(response.statusCode).to.equal(500);
    });
  });

  describe('#Add candidate', () => {
    it('should failed(one of required fields is missing)', async () => {
      const data = await readFileAsync('./test/data/candidates/add-candidate-4.json', 'utf8');
      const response = await req
        .post('http://localhost:3300/candidates')
        .set('Accept', 'application/json')
        .send(JSON.parse(data))
        .ok(res => res.status <= 500);
      expect(response.statusCode).to.equal(500);
    });
  });
});
