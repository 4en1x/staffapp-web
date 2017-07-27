import React from "react";
import { Route, Switch } from "react-router-dom";
import WorkerPage from "../worker-page/worker-page";
import HRPage from "../hr-page/hr-page";
import Header from "../../components/header/header.components";
import InterviewPage from "../interview-page/interview-page";
import CandidatePage from "../candidate-detail-page/candidate-page";
import TechnicalFeedback from "../add-technical-feedback-page/technical-feedback";
import "../../index.css";

export default class App extends React.Component {
  config = () => ({
    HR: HRPage,
    user: WorkerPage
  });

  render() {
    const config = this.config();
    const user = this.props.user;

    return (
      <div className="root-class">
        <Header user={{ name: user.name, surname: user.surname }} />
        <Switch>
          <Route exact path="/interviews/:id" component={InterviewPage} />
          <Route
            path="/interviews/:id/feedback/:id"
            component={TechnicalFeedback}
          />
          <Route path="/candidates/:id" component={CandidatePage} />
          <Route path="/" component={config[user.role]} />
        </Switch>
      </div>
    );
  }
}
