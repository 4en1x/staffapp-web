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

//create redux store
//const store = createStore(reducer);

//console logger
//console.log('store with initial state');
//console.log(store.getState());

//subscribe ob changes

//store.subscribe(() => {
  //console.log(store.getState());
//});

//dispatch
//store.dispatch(addUser('Sergey'));
//store.dispatch(addNumber(21));

const reducer = combineReducers({
  auth: addUserToStore,
  interview: interviewHandle
});

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

store.subscribe(() => {
  console.log(store.getState());
});

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
