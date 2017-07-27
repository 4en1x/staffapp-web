import React from 'react';
import { Route, Switch } from 'react-router-dom';
import WorkerPage from '../worker-page/worker-page';
import HRPage from '../hr-page/hr-page';
import Header from '../../components/header/header.components';
import InterviewPage from '../interview-page/interview-page';
import CandidatePage from '../candidate-detail-page/candidate-page';
import VacancyPage from '../vacany-detail-page/vacancy-page';
import FeedBackPage from '../feedback/feedback-page';
import '../../index.css';

export default class App extends React.Component {
  config = () => ({
    hr: HRPage,
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
          <Route path="/interviews/:id/feedback/:id" component={FeedBackPage} />
          <Route path="/candidates/:id" component={CandidatePage} />
          <Route path="/vacancies/:id" component={VacancyPage} />
          <Route path="/" component={config[user.role]} />
        </Switch>
      </div>
    );
  }
}
