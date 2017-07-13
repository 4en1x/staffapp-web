import React from "react";
import ReactDOM from "react-dom";
import CandidateDetailPage from "./main/candidate-detail-page/candidate-page";
import HeaderComponent from "./components/header/header.components";
import "./index.css";

ReactDOM.render(
  <div>
    <HeaderComponent user={{ name: "Sergey", surname: "Moiseyenko" }} />
    <CandidateDetailPage />
  </div>,
  document.getElementById("root")
);
