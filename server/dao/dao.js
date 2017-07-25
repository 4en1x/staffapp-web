const Bluebird = require('bluebird');
const connection = Bluebird.promisifyAll(require('./connection/connect'));

const Interviews = require('./interviews.dao');
const Hirings = require('./hirings.dao');
const Feedbacks = require('./feedbacks.dao');
const Vacancies = require('./vacancies.dao');

const interviews = new Interviews(connection);
const hirings = new Hirings(connection);
const feedbacks = new Feedbacks(connection);
const vacancies = new Vacancies(connection);
const UsersDAO = require('./impl/users.dao');
const CandidatesDAO = require('./impl/candidates.dao');

module.exports = {
  interviews,
  hirings,
  feedbacks,
  vacancies,
  users: UsersDAO.instance,
  candidates: CandidatesDAO.instance,
};
