import React from "react";
import ReactDOM from "react-dom";
import CandidateDetailPage from './main/add-technical-feedback-page/add-technical-feedback-page.component';
import HeaderComponent from './components/header/header.components';
import './index.css'

ReactDOM.render(
  <div>
    <HeaderComponent user={{ name: 'Sergey', surname: 'Moiseyenko' }} />
    <CandidateDetailPage />
  </div>,
  document.getElementById("root"));
