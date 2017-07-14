const Users = require('./dao/users.dao');
const Candidates = require('./dao/candidates.dao');
const Interviews = require('./dao/interviews.dao');

const users = new Users();
const candidates = new Candidates();
const interviews = new Interviews();

module.exports = {
  users,
  candidates,
  interviews,
};
