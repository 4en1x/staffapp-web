import React from "react";
import ReactDOM from "react-dom";
import ReportPage from "./main/report-page/report-page.component";
import HeaderComponent from "./components/header/header.components";
import "./index.css";

ReactDOM.render(
  <div>
    <HeaderComponent user={{ name: "Sergey", surname: "Moiseyenko" }} />
    <ReportPage />
  </div>,
  document.getElementById("root")
);
