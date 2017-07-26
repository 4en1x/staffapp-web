import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import thunk from "redux-thunk";
import SignInComponent from "./main/auth/sign-in/sign-in.component";
import App from "./main/app/app";
import checkAuth from "./main/auth/auth-component";
import authReducer from "./main/auth/auth-reducer";
import interviewReducer from "./main/interview-page/interview-reducer";
import feedbackReducer from "./main/add-technical-feedback-page/feedback-reducer";
import "./index.css";

const reducer = combineReducers({
  auth: authReducer,
  interview: interviewReducer,
  feedback: feedbackReducer,
  form: reduxFormReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/login" component={SignInComponent} />
        <Route path="/" component={checkAuth(App)} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
