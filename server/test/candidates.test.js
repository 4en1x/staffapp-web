const Bluebird = require('bluebird');
const connection = Bluebird.promisifyAll(require('../dao/connection/connect'));
const readFileAsync = Bluebird.promisify(require('fs').readFile);
const request = require('supertest');
const app = require('./app-test');
const clearDb = require('./clearDb')

describe('Candidates-Api', () => {
    beforeEach(async () => {
        const data = await readFileAsync('../db/prepare_sql.txt', 'utf8');
        await connection.queryAsync(data);
    });
    afterEach(async () => {
        clearDb()
    });
  describe('#Add candidate', () => {
    it('should pass', async () => {
      const data = await readFileAsync('./test/data/candidates/add-candidate-1.json', 'utf8');
      request(app).post('/candidates', data)
        .expect(200);
    });
  });
});
