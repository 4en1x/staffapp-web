import axios from "axios";
import userService from "../../service/user-service";
axios.defaults.withCredentials = true;

const ADD_USER = "ADD_USER";
const ADD_USER_ERROR = "ADD_USER_ERROR";

function addUser(user) {
  return {
    type: ADD_USER,
    user
  };
}

function addUserError(user) {
  return {
    type: ADD_USER_ERROR,
    user
  };
}

export function login(user) {
  return dispatch => {
    userService.login(user).then(response => {
      dispatch(addUser(response.data));
    });
  };
}
