import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import { Provider } from "react-redux";

import VacanciesFilterForm from "./components/filter/filter-forms/vacancies-filter-form";
import CandidatesFilterForm from "./components/filter/filter-forms/candidates-filter-form";
import FilterComponent from "./components/filter/filter.component";
import HeaderComponent from "./components/header/header.components";
import "./index.css";

const reducer = combineReducers({
  form: reduxFormReducer // mounted under "form"
});
const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer);

ReactDOM.render(
  <div>
    <HeaderComponent user={{ name: "Sergey", surname: "Moiseyenko" }} />
    <Provider store={store}>
      <FilterComponent form={CandidatesFilterForm} />
    </Provider>
  </div>,
  document.getElementById("root")
);
