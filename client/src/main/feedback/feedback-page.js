import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import FeedbackView from "./components/feedback-view";

const inputData = {
  id: 1,
  userId: 2,
  interviewId: 1,
  candidateId: 1,
  comment: null,
  status: 1,
  fields: [
    {
      id: 16,
      name: "ascel",
      value: null,
      comment: null,
      typeSkill: "secondary",
      type: "tech"
    },
    {
      id: 23,
      name: "english level",
      value: null,
      comment: null,
      typeSkill: "other",
      type: "tech"
    },
    {
      id: 45,
      name: "beauty",
      value: null,
      comment: null,
      typeSkill: "other",
      type: "tech"
    },
    {
      id: 19,
      name: "c++",
      value: null,
      comment: null,
      typeSkill: "secondary",
      type: "tech"
    },
    {
      id: 17,
      name: "ruby",
      value: "123",
      comment: "not very vell",
      typeSkill: "primary",
      type: "tech"
    }
  ]
};

const reducer = combineReducers({
  form: reduxFormReducer // mounted under "form"
});
const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer);

export default class FeedbackPage extends React.Component {
  showResults = values =>
    window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);

  render() {
    return (
      <Provider store={store}>
        <FeedbackView onSubmitClicked={this.showResults} data={inputData} />
      </Provider>
    );
  }
}
