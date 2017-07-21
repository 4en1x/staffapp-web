import React from "react";
import WorkerPage from "../worker-page/worker-page";
import HRPage from "../hr-page/hr-page";
import Header from "../../components/header/header.components";
import { Route, Switch, Redirect } from "react-router-dom";
import InterviewPage from "../interview-page/interview-page";
import CandidatePage from "../candidate-detail-page/candidate-page";
import TechnicalFeedback from "../add-technical-feedback-page/technical-feedback.js";
import "../../index.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.user = props.user;
  }

  config = () => ({
    HR: HRPage,
    user: WorkerPage
  });

  render() {
    const config = this.config();
    const user = this.user;
    console.log(this.props);

    return (
      <div className="root-class">
        <Header user={{ name: user.name, surname: "Surname" }} />
        <Switch>
          <Route exact path="/interviews/:id" component={InterviewPage} />
          <Route
            path="/interviews/:id/feedback"
            component={TechnicalFeedback}
          />
          <Route path="/candidates/:id" component={CandidatePage} />
          <Route path="/" component={config[user.role]} />
        </Switch>
      </div>
    );
  }
}
