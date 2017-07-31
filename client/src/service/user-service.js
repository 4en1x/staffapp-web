import axios from "axios";

axios.defaults.withCredentials = true;

function login(user) {
  return axios.post(`/login`, user);
}

function checkEmail(email) {
  return axios.post("/email", email);
}

const userService = {
  login,
  checkEmail
};

export default userService;
