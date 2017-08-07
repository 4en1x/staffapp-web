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

function logout() {
  return axios.post(`/logout`);
}

const userService = {
  login,
  checkEmail,
  isAuthorized,
  logout
};

export default userService;
