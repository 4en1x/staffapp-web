import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

function isAuth() {
  const user = localStorage.getItem("user");
  if (user === null) return;
  return JSON.parse(user);
}

export default function checkAuth(Component) {
  return function(props) {
    const userFromSession = isAuth();
    const user = userFromSession || props.location.state;
    if (!user) return <Redirect to="login" />;
    return <Component {...props} user={user} />;
  };
}
