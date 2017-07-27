import React from 'react';
import { Route, Switch } from 'react-router-dom';
import WorkerPage from '../worker-page/worker-page';
import HRPage from '../hr-page/hr-page';
import Header from '../../components/header/header.components';
import CandidatePage from '../candidate-detail-page/candidate-page';
import InterviewPage from '../interview-page/interview-page';
import FeedBackPage from '../feedback-page/feedback-page';
import '../../index.css';

export default class App extends React.Component {
  config = () => ({
    HR: HRPage,
    user: WorkerPage
  });

  render() {
    const config = this.config();
    const user = this.props.user;

    console.log(user);

    return (
      <div className="root-class">
        <Header user={{ name: user.name, surname: user.surname }} />
        <Switch>
          <Route exact path="/interviews/:id" component={InterviewPage} />
          <Route
            path="/interviews/:id/feedback/:id"
            component={FeedBackPage}
          />
          <Route path="/candidates/:id" component={CandidatePage} />
          <Route path="/" component={config[user.role]} />
        </Switch>
      </div>
    );
  }
}
