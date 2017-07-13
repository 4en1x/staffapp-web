const Users = require('./dao/users.dao');
const Candidates = require('./dao/candidates.dao');

const users = new Users();
const candidates = new Candidates();

module.exports = {
  users,
  candidates,
};
