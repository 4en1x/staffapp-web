import React from "react";
import ReactDOM from "react-dom";
import HistoryPage from "./main/history-page/history-page.component";
import HeaderComponent from "./components/header/header.components";
import "./index.css";

ReactDOM.render(
  <div>
    <HeaderComponent user={{ name: "Sergey", surname: "Moiseyenko" }} />
    <HistoryPage />
  </div>,
  document.getElementById("root")
);
