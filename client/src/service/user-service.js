import axios from 'axios';

function login(user) {
  return axios.post(`/login`, user);
}

function checkEmail(email) {
  return axios.post('/email', email);
}

function isAuthorized() {
  return axios.get('/username');
}

const userService = {
  login,
  checkEmail,
  isAuthorized
};

export default userService;
