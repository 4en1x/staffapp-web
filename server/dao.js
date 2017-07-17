const Bluebird = require('bluebird');
const connection = Bluebird.promisifyAll(require('./dao/connection/connect'));
const Users = require('./dao/users.dao');
const Candidates = require('./dao/candidates.dao');
const Interviews = require('./dao/interviews.dao');
const Hirings = require('./dao/hirings.dao');
const Feedbacks = require('./dao/feedbacks.dao');

const users = new Users(connection);
const candidates = new Candidates(connection);
const interviews = new Interviews(connection);
const hirings = new Hirings(connection);
const feedbacks = new Feedbacks(connection);

module.exports = {
  users,
  candidates,
  interviews,
  hirings,
  feedbacks,
};
