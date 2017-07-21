import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import { Provider } from "react-redux";

import HeaderComponent from "./components/header/header.components";
import FeedbackTechnicalPage from "./main/add-technical-feedback-page/components/add-technical-feedback-page.component";
import "./index.css";

const reducer = combineReducers({
  form: reduxFormReducer
});

const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer);

ReactDOM.render(
  <div>
    <HeaderComponent user={{ name: "Sergey", surname: "Moiseyenko" }} />
    <Provider store={store}>
      <FeedbackTechnicalPage />
    </Provider>
  </div>,
  document.getElementById("root")
);
