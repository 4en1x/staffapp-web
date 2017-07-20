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
  before(async () => {
    let data = await readFileAsync('../db/prepare_sql.txt', 'utf8');
    await connection.queryAsync(data);
    data = await readFileAsync('./test/data/auth/login-1.json', 'utf8');
    const response = await req
      .post(`${defaultUrl}/login`)
      .send(JSON.parse(data));
    expect(response.statusCode).to.equal(200);
  });

  describe('#Add candidate', () => {
    it('should pass', async () => {
      const data = await readFileAsync('./test/data/candidates/add-candidate-1.json', 'utf8');
      const response = await req
        .post(`${defaultUrl}/candidates`)
        .set('Accept', 'application/json')
        .send(JSON.parse(data));
      expect(response.statusCode).to.equal(200);
    });

    it('should pass : another example with different fields', async () => {
      const data = await readFileAsync('./test/data/candidates/add-candidate-5.json', 'utf8');
      const response = await req
        .post(`${defaultUrl}/candidates`)
        .set('Accept', 'application/json')
        .send(JSON.parse(data));
      expect(response.statusCode).to.equal(200);
    });
  });

  describe('#Add candidate', () => {
    it('should failed with 500 error : city don\'t exist', async () => {
      const data = await readFileAsync('./test/data/candidates/add-candidate-2.json', 'utf8');
      const response = await req
        .post(`${defaultUrl}/candidates`)
        .set('Accept', 'application/json')
        .send(JSON.parse(data))
        .ok(res => res.status <= 500);
      expect(response.statusCode).to.equal(500);
    });

    it('should failed with 500 error : field don\'t exist', async () => {
      const data = await readFileAsync('./test/data/candidates/add-candidate-3.json', 'utf8');
      const response = await req
        .post(`${defaultUrl}/candidates`)
        .set('Accept', 'application/json')
        .send(JSON.parse(data))
        .ok(res => res.status <= 500);
      expect(response.statusCode).to.equal(500);
    });

    it('should failed with 500 error :one of required fields is missing', async () => {
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
    it('should pass', async () => {
      const data = await readFileAsync('./test/data/candidates/check-candidate-1.json', 'utf8');
      const response = await req
        .get(`${defaultUrl}/candidates/1`)
        .set('Accept', 'application/json');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.shallowDeepEqual(toCamel(JSON.parse(data)));
    });

    it('should failed with 500 error :id don\'t exist', async () => {
      const response = await req
        .get(`${defaultUrl}/candidates/0`)
        .ok(res => res.status <= 500);
      expect(response.statusCode).to.equal(500);
    });
  });

  describe('#Get all candidates', () => {
    it('should pass', async () => {
      const data = await readFileAsync('./test/data/candidates/read-page-candidate-1.json', 'utf8');
      const response = await req
        .get(`${defaultUrl}/candidates?p=1`)
        .set('Accept', 'application/json');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.shallowDeepEqual(JSON.parse(data));
    });

    it('should pass: example with page that doesn\'t exist', async () => {
      const response = await req
        .get(`${defaultUrl}/candidates?p=100000000000`)
        .set('Accept', 'application/json');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.shallowDeepEqual([]);
    });
  });

  describe('#Delete candidate', () => {
    it('should pass', async () => {
      const response = await req
        .delete(`${defaultUrl}/candidates/5`)
        .set('Accept', 'application/json');
      expect(response.statusCode).to.equal(200);
    });

    it('should failed with 500 error : candidate already deleted', async () => {
      const response = await req
        .delete(`${defaultUrl}/candidates/5`)
        .set('Accept', 'application/json')
        .ok(res => res.status <= 500);
      expect(response.statusCode).to.equal(500);
    });
  });

  describe('#Update candidate', () => {
    it('should pass', async () => {
      let data = await readFileAsync('./test/data/candidates/update-candidate-set-1.json', 'utf8');
      let response = await req
        .patch(`${defaultUrl}/candidates/4`)
        .set('Accept', 'application/json')
        .send(JSON.parse(data));
      expect(response.statusCode).to.equal(200);
      data = await readFileAsync('./test/data/candidates/update-candidate-get-1.json', 'utf8');
      response = await req
        .get(`${defaultUrl}/candidates/4`)
        .set('Accept', 'application/json');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.shallowDeepEqual(toCamel(JSON.parse(data)));
    });

    it('should pass : just another example with all fields', async () => {
      let data = await readFileAsync('./test/data/candidates/update-candidate-set-2.json', 'utf8');
      let response = await req
        .patch(`${defaultUrl}/candidates/4`)
        .set('Accept', 'application/json')
        .send(JSON.parse(data));
      expect(response.statusCode).to.equal(200);
      data = await readFileAsync('./test/data/candidates/update-candidate-get-2.json', 'utf8');
      response = await req
        .get(`${defaultUrl}/candidates/4`)
        .set('Accept', 'application/json');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.shallowDeepEqual(toCamel(JSON.parse(data)));
    });

    it('should pass : just another example with only one field', async () => {
      const data = await readFileAsync('./test/data/candidates/update-candidate-set-3.json', 'utf8');
      const response = await req
        .patch(`${defaultUrl}/candidates/4`)
        .set('Accept', 'application/json')
        .send(JSON.parse(data))
        .ok(res => res.status <= 500);
      expect(response.statusCode).to.equal(500);
    });
  });
});
