import React from "react";
import ReactDOM from "react-dom";
import HRPage from "./main/hr-page/hr-page.component";
import HeaderComponent from "./components/header/header.components";
import "./index.css";

ReactDOM.render(
  <div>
    <HeaderComponent user={{ name: "Sergey", surname: "Moiseyenko" }} />
    <HRPage />
  </div>,
  document.getElementById("root")
);
