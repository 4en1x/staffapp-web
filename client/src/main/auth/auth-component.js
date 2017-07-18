import React from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

const user = {
  name: 'I',
  role: 'HR'
};

function isAuth() {
 return axios.get('isAuth');
}

export default function checkAuth(Component) {
  return function (props) {
    if (!user) return <Redirect to='login' />;
    return <Component {...props} user={user}/>
  };
}
