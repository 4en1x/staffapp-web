import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainComponent from '../main-component/main-component';
import Header from '../../components/header/header.components';
import InterviewPage from '../interview/interview-detail-page/interview-detail-page';
import CandidatePage from '../candidate/candidate-detail-page/candidate-page';
import VacancyPage from '../vacancy/vacancy-detail-page/vacancy-detail-page';
import FeedBackPage from '../feedback/feedback-page';
import EditInterviewPage from '../interview/interview-edit-page/interview-edit-page';
import EditVacancyPage from '../vacancy/vacancy-edit-page/vacancy-edit-page';
import AddInterviewPage from '../interview/interview-add-page/interview-add-page';
import AddVacancyPage from '../vacancy/vacancy-add-page/vacancy-add-page';
import AddCandidate from '../candidate/candidate-add-page/add-candidate-page';
import CandidateEditPage from '../candidate/candidate-edit-page/candidate-edit-page';
import HiringPage from '../hiring-page/hiring-page.component';
import { logout } from '../auth/auth-actions';
import { store } from '../../index';
import '../../index.css';

export default class App extends React.Component {

  itemSelected = (event, data) => {
    store.dispatch(logout());
  };

  render() {
    const user = this.props.user;

    return (
      <div className="root-class parent-size">
        <Header
          user={{ name: user.name, role: user.role }}
          itemSelected={this.itemSelected}
        />
        <div className="page-container">
          <Switch>
            <Route path="/interviews/add" component={AddInterviewPage} />
            <Route exact path="/interviews/:id" component={InterviewPage} />
            <Route path="/interviews/:id/edit" component={EditInterviewPage} />
            <Route
              path="/interviews/:id/feedbacks/:id"
              component={FeedBackPage}
            />
            <Route path="/candidates/add" component={AddCandidate} />
            <Route path="/candidates/:id/edit" component={CandidateEditPage} />
            <Route path="/candidates/:id" component={CandidatePage} />
            <Route path="/vacancies/add" component={AddVacancyPage} />
            <Route path="/vacancies/:id/edit" component={EditVacancyPage} />
            <Route path="/vacancies/:id" component={VacancyPage} />
            <Route path="/hiring/:id" component={HiringPage}/>
            <Route path="/" component={MainComponent} />
          </Switch>
        </div>
      </div>
    );
  }
}
