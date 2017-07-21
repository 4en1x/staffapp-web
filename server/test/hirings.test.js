const Bluebird = require('bluebird');
const connection = Bluebird.promisifyAll(require('../dao/connection/connect'));
const readFileAsync = Bluebird.promisify(require('fs').readFile);
const request = require('superagent').agent();
const expect = require('chai').expect;
const app = require('./app-test');
const defaultUrl = require('../config').web.backendOrigin;

describe('#Hirings-Api', () => {
  beforeEach(async () => {
    let data = await readFileAsync('../db/prepare_sql_for_hirings.txt', 'utf8');
    await connection.queryAsync(data);
    data = await readFileAsync('./test/data/auth/login-1.json', 'utf8');
    const response = await request
      .post(`${defaultUrl}/login`)
      .send(JSON.parse(data));
    expect(response.statusCode).to.equal(200);
  });

  describe('#Add hirings', () => {
    it('This test should pass, because admin and hr can add hirings',
      async () => {
        const data = await readFileAsync('./test/data/hirings/add-hirings-1.json', 'utf8');
        const response = await request
          .post(`${defaultUrl}/hirings?candidate=5`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(200);
        expect(response.body.added).to.equal(true);
      });

    it('This test should failed with 500 error because candidate is not exist. We can not appoint hiring.',
      async () => {
        const data = await readFileAsync('./test/data/hirings/add-hirings-1.json', 'utf8');
        const response = await request
          .post(`${defaultUrl}/hirings?candidate=41`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(500);
      });

    it('This test should failed with 500 error because candidate already has hiring. We can not appoint hiring.',
      async () => {
        let data = await readFileAsync('./test/data/hirings/add-hirings-1.json', 'utf8');
        let response = await request
          .post(`${defaultUrl}/hirings?candidate=5`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(200);
        expect(response.body.added).to.equal(true);
        data = await readFileAsync('./test/data/hirings/add-hirings-1.json', 'utf8');
        response = await request
          .post(`${defaultUrl}/hirings?candidate=5`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(200);
        expect(response.body.added).to.equal(false);
        expect(response.body.message).to.equal('candidate already has hiring');
      });

    it('This test  should failed with 500 error : user is not exist. We can not appoint hiring.',
      async () => {
        const data = await readFileAsync('./test/data/hirings/add-hirings-2.json', 'utf8');
        const response = await request
          .post(`${defaultUrl}/hirings?candidate=8`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(500);
      });
  });


  describe('#Read hiring', () => {
    it('This test should pass, because admin and hr can read hirings',
      async () => {
        const data = await readFileAsync('./test/data/hirings/add-hirings-1.json', 'utf8');
        let response = await request
          .post(`${defaultUrl}/hirings?candidate=5`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(200);
        expect(response.body.added).to.equal(true);
        response = await request
          .get(`${defaultUrl}/hirings?id=5`)
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.lengthOf(1);
        expect(response.body[0]).to.be.an('object');
      });

    it('This test should pass, because admin and hr can read hirings (another example)',
      async () => {
        const response = await request
          .get(`${defaultUrl}/hirings?id=7`)
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.lengthOf(1);
        expect(response.body[0]).to.be.an('object');
      });

    it('This test should pass because admin and hr can read hirings, but return empty array: candidate is not exist',
      async () => {
        const response = await request
          .get(`${defaultUrl}/hirings?id=4865415648`)
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.lengthOf(0);
      });
  });

  describe('#Update hiring', () => {
    it('This test should pass, because admin and hr can update hirings',
      async () => {
        const data = await readFileAsync('./test/data/hirings/update-hirings-1.json', 'utf8');
        let response = await request
          .patch(`${defaultUrl}/hirings/6`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data))
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(200);
        response = await request
          .get(`${defaultUrl}/hirings/6`)
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('id', 6);
        expect(response.body).to.have.property('userId', 1);
        expect(response.body).to.have.property('interviews');
        expect(response.body.interviews).to.be.an('array');
      });
  });

  describe('#Delete hiring ', () => {
    it('This test should pass, because admin can delete hirings',
      async () => {
        const response = await request
          .delete(`${defaultUrl}/hirings/6`);
        expect(response.statusCode).to.equal(200);
      });

    it('This test should failed with 500 error because hiring is not exist and nobody can delete it',
      async () => {
        const response = await request
          .delete(`${defaultUrl}/hirings/685421`)
          .ok(res => res.status <= 500);
        expect(response.statusCode).to.equal(500);
      });

    it('This test should pass, but return empty array: hiring was already deleted',
      async () => {
        let response = await request
          .delete(`${defaultUrl}/hirings/6`);
        expect(response.statusCode).to.equal(200);
        response = await request
          .get(`${defaultUrl}/hirings?id=7`);
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.lengthOf(0);
      });

    it('This test should pass, because if we delete hiring, candidate now don\'t have hiring and we can appoint it',
      async () => {
        let response = await request
          .delete(`${defaultUrl}/hirings/6`);
        expect(response.statusCode).to.equal(200);
        const data = await readFileAsync('./test/data/hirings/add-hirings-1.json', 'utf8');
        response = await request
          .post(`${defaultUrl}/hirings?candidate=7`)
          .set('Accept', 'application/json')
          .send(JSON.parse(data));
        expect(response.statusCode).to.equal(200);
        expect(response.body.added).to.equal(true);
      });
  });
});
