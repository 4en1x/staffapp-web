import React from "react";
import WorkerPage from "../worker-page/worker-page";
import HRPage from "../hr-page/hr-page";
import Header from "../../components/header/header.components";
import { Route, Switch, Redirect } from "react-router-dom";
import InterviewPage from "../interview-page/interview-page";
import CandidatePage from '../candidate-detail-page/candidate-page';
import "../../index.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  config = () => {
    return {
      HR: HRPage,
      Worker: WorkerPage
    };
  };

  render() {
    const config = this.config();
    const user = this.props.user;
    console.log(user);

    return (
      <div className="root-class">
        <Header user={{ name: user.name, surname: "Surname" }} />
        <Switch>
          <Route path="/interviews/:id" component={InterviewPage} />
          <Route path="/candidates/:id" component={CandidatePage} />
          <Route path="/" component={config[user.role]} />
        </Switch>
      </div>
    );
  }
}
