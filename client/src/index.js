import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import { Provider } from "react-redux";

import HeaderComponent from "./components/header/header.components";
import FeedbackTechnicalPage from "./main/add-technical-feedback-page/components/add-technical-feedback-page.component";
import "./index.css";

const reducer = combineReducers({
  form: reduxFormReducer // mounted under "form"
});
const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer);

function showResults(values) {
  window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  console.log("hufuefhue");
}

ReactDOM.render(
  <div>
    <HeaderComponent user={{ name: "Sergey", surname: "Moiseyenko" }} />
    <Provider store={store}>
      <FeedbackTechnicalPage onSubmit={showResults} />
    </Provider>
  </div>,
  document.getElementById("root")
);
