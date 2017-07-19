import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import SignInComponent from "./main/auth/sign-in/sign-in.component";
import App from "./main/app/app";
import checkAuth from './main/auth/auth-component';
import "./index.css";

ReactDOM.render(
  <Router>
      <Switch>
        <Route path='/login' component={SignInComponent}/>
        <Route path='/' component={checkAuth(App)}/>
      </Switch>
  </Router>,

  document.getElementById("root")
);
