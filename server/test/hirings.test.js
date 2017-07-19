const Bluebird = require('bluebird');
const connection = Bluebird.promisifyAll(require('../dao/connection/connect'));
const readFileAsync = Bluebird.promisify(require('fs').readFile);
const request = require('superagent').agent();
const expect = require('chai').expect;


describe('#Hirings-Api', () => {
  before(async () => {
    let data = await readFileAsync('../db/prepare_sql_for_hirings.txt', 'utf8');
    await connection.queryAsync(data);
    data = await readFileAsync('./test/data/auth/login-1.json', 'utf8');
    const response = await request
      .post('http://localhost:3300/login')
      .send(JSON.parse(data));
    expect(response.statusCode).to.equal(200);
  });

  describe('#Add hiring #1', () => {
    it('should pass', async () => {
      const data = await readFileAsync('./test/data/hirings/add-hirings-1.json', 'utf8');
      const response = await request
        .post('http://localhost:3300/hirings?candidate=5')
        .set('Accept', 'application/json')
        .send(JSON.parse(data))
        .ok(res => res.status <= 500);
      expect(response.statusCode).to.equal(200);
      expect(response.body.added).to.equal(true);
    });
  });

  describe('#Add hiring #2', () => {
    it('should failed: candidate is not exist', async () => {
      const data = await readFileAsync('./test/data/hirings/add-hirings-1.json', 'utf8');
      const response = await request
        .post('http://localhost:3300/hirings?candidate=41')
        .set('Accept', 'application/json')
        .send(JSON.parse(data))
        .ok(res => res.status <= 500);
      expect(response.statusCode).to.equal(500);
    });
  });

  describe('#Add hiring #3', () => {
    it('should failed: candidate already has hiring', async () => {
      const data = await readFileAsync('./test/data/hirings/add-hirings-1.json', 'utf8');
      const response = await request
        .post('http://localhost:3300/hirings?candidate=5')
        .set('Accept', 'application/json')
        .send(JSON.parse(data))
        .ok(res => res.status <= 500);
      expect(response.statusCode).to.equal(200);
      expect(response.body.added).to.equal(false);
      expect(response.body.message).to.equal('candidate already has hiring');
    });
  });

  describe('#Add hiring #4', () => {
    it('should failed: user is not exist', async () => {
      const data = await readFileAsync('./test/data/hirings/add-hirings-2.json', 'utf8');
      const response = await request
        .post('http://localhost:3300/hirings?candidate=8')
        .set('Accept', 'application/json')
        .send(JSON.parse(data))
        .ok(res => res.status <= 500);
      expect(response.statusCode).to.equal(500);
    });
  });


  describe('#Read hiring #1', () => {
    it('should pass', async () => {
      const response = await request
        .get('http://localhost:3300/hirings?id=5')
        .ok(res => res.status <= 500);
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf(1);
      expect(response.body[0]).to.be.an('object');
    });
  });

  describe('#Read hiring #2', () => {
    it('should pass', async () => {
      const response = await request
        .get('http://localhost:3300/hirings?id=7')
        .ok(res => res.status <= 500);
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf(1);
      expect(response.body[0]).to.be.an('object');
    });
  });

  describe('#Read hiring #3', () => {
    it('should failed: candidate is not exist', async () => {
      const response = await request
        .get('http://localhost:3300/hirings?id=4865415648')
        .ok(res => res.status <= 500);
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf(0);
    });
  });

  describe('#Update hiring #1', () => {
    it('should pass', async () => {
      const data = await readFileAsync('./test/data/hirings/update-hirings-1.json', 'utf8');
      const response = await request
        .patch('http://localhost:3300/hirings/6')
        .set('Accept', 'application/json')
        .send(JSON.parse(data))
        .ok(res => res.status <= 500);
      expect(response.statusCode).to.equal(200);
    });
  });

  describe('#Read hiring #4', () => {
    it('should pass', async () => {
      const response = await request
        .get('http://localhost:3300/hirings/6')
        .ok(res => res.status <= 500);
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('id', 6);
      expect(response.body).to.have.property('userId', 1);
      expect(response.body).to.have.property('interviews');
      expect(response.body.interviews).to.be.an('array');
    });
  });

  describe('#Delete hiring #1', () => {
    it('should pass', async () => {
      const response = await request
        .delete('http://localhost:3300/hirings/6')
        .ok(res => res.status <= 500);
      expect(response.statusCode).to.equal(200);
    });
  });

  describe('#Delete hiring #2', () => {
    it('should failed: hiring is not exist', async () => {
      const response = await request
        .delete('http://localhost:3300/hirings/685421')
        .ok(res => res.status <= 500);
      expect(response.statusCode).to.equal(500);
    });
  });

  describe('#Read hiring #5', () => {
    it('should failed: hiring was deleted', async () => {
      const response = await request
        .get('http://localhost:3300/hirings?id=7')
        .ok(res => res.status <= 500);
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf(0);
    });
  });

  describe('#Add hiring #5', () => {
    it('should pass', async () => {
      const data = await readFileAsync('./test/data/hirings/add-hirings-1.json', 'utf8');
      const response = await request
        .post('http://localhost:3300/hirings?candidate=7')
        .set('Accept', 'application/json')
        .send(JSON.parse(data))
        .ok(res => res.status <= 500);
      expect(response.statusCode).to.equal(200);
      expect(response.body.added).to.equal(true);
    });
  });

});
