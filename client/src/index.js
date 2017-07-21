import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import SignInComponent from "./main/auth/sign-in/sign-in.component";
import App from "./main/app/app";
import { Provider } from 'react-redux'
import {combineReducers, createStore, applyMiddleware} from "redux";
import checkAuth from './main/auth/auth-component';
import {addUserToStore, interviewHandle} from './reducers/reducers.js';
import thunk from 'redux-thunk';
import "./index.css";

const reducer = combineReducers({
  auth: addUserToStore,
  interview: interviewHandle
});

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
        <Switch>
          <Route path='/login' component={SignInComponent}/>
          <Route path='/' component={checkAuth(App)}/>
        </Switch>
      </Router>
    </Provider>,
  document.getElementById("root")
);
