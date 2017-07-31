const Bluebird = require('bluebird');
const connection = Bluebird.promisifyAll(require('../dao/connection/connect'));
const readFileAsync = Bluebird.promisify(require('fs').readFile);
const app = require('./app-test');
const req = require('superagent').agent();
const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
const defaultUrl = require('../config').web.backendOrigin;

const expect = chai.expect;

describe('#Search-Api', () => {
  beforeEach(async () => {
    let data = await readFileAsync('../db/prepare_sql.txt', 'utf8');
    await connection.queryAsync(data);
    data = await readFileAsync('./test/data/auth/login-1.json', 'utf8');
    const response = await req
      .post(`${defaultUrl}/login`)
      .send(JSON.parse(data));
    expect(response.statusCode).to.equal(200);
  });

  describe('#Get queries', () => {
    it('This test should pass, because hr and admin have access for search functions',
      async () => {
        let response = await req
          .get(`${defaultUrl}/search?table=cities&searchString=i`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.lengthOf(4);

        response = await req
          .get(`${defaultUrl}/search?table=candidates&searchString=free`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.lengthOf(2);

        response = await req
          .get(`${defaultUrl}/search?table=users&searchString=free`)
          .set('Accept', 'application/json');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.lengthOf(5);
      });

    it('This test should fail with 500 error because table in query doesn\'t exist',
      async () => {
        const response = await req
          .get(`${defaultUrl}/search?table=notexist&searchString=i`)
          .set('Accept', 'application/json')
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(500);
      });
  });
});
