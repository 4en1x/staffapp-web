const Bluebird = require('bluebird');
const connection = Bluebird.promisifyAll(require('./connection/connect'));

const Feedbacks = require('./feedbacks.dao');
const Vacancies = require('./vacancies.dao');

const feedbacks = new Feedbacks(connection);
const vacancies = new Vacancies(connection);
const UsersDAO = require('./impl/users.dao');
const CandidatesDAO = require('./impl/candidates.dao');
const InterviewsDAO = require('./impl/interviews.dao');
const HiringsDAO = require('./impl/hirings.dao');

module.exports = {
  feedbacks,
  vacancies,
  users: UsersDAO.instance,
  candidates: CandidatesDAO.instance,
  interviews: InterviewsDAO.instance,
  hirings: HiringsDAO.instance,
};
