const Bluebird = require('bluebird');
const connection = Bluebird.promisifyAll(require('./connection/connect'));

const Users = require('./users.dao');
const Candidates = require('./candidates.dao');
const Interviews = require('./interviews.dao');
const Hirings = require('./hirings.dao');
const Feedbacks = require('./feedbacks.dao');
const Vacancies = require('./vacancies.dao');

const users = new Users(connection);
const candidates = new Candidates(connection);
const interviews = new Interviews(connection);
const hirings = new Hirings(connection);
const feedbacks = new Feedbacks(connection);
const vacancies = new Vacancies(connection);

module.exports = {
  users,
  candidates,
  interviews,
  hirings,
  feedbacks,
  vacancies,
};
