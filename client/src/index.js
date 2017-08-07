import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import thunk from 'redux-thunk';
import SignInComponent from './main/auth/sign-in/sign-in.component';
import App from './main/app/app';
import checkAuth from './main/auth/auth-component';
import authReducer from './main/auth/auth-reducer';
import interviewReducer from './main/interview/interview-reducer';
import feedbackReducer from './main/feedback/feedback-reducer';
import vacancyReducer from './main/vacancy/vacancy-reducer';
import candidateReducer from './main/candidate/candidate-reducer';
import navigationBarReducer from './components/hr-navigation-bar/navigation-reducer';
import historyReducer from './main/history/history-reducer';
import hiringReducer from './main/hiring-page/hiring-reducer';
import { loadState, saveState } from './localStorage';
import './index.css';

const persistedState = loadState();

const reducer = combineReducers({
  auth: authReducer,
  interview: interviewReducer,
  feedback: feedbackReducer,
  vacancy: vacancyReducer,
  candidate: candidateReducer,
  navigationBar: navigationBarReducer,
  history: historyReducer,
  hiring: hiringReducer,
  form: reduxFormReducer
});

const store = createStore(reducer, persistedState, applyMiddleware(thunk));
store.subscribe(() => {
  console.log('lalalla');
  saveState(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/login" component={SignInComponent} />
        <Route path="/" component={checkAuth(App)} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

export { store };
