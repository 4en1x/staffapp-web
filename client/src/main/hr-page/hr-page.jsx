import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import HRNavigationBar from '../../components/hr-navigation-bar/navigation-bar';
import InterviewListWrapper from './components/interview-list-wrapper';
import CandidateListWrapper from './components/candidate-list-wrapper';
import VacancyListWrapper from './components/vacancy-list-wrapper';
import SecondaryMenuComponent from '../../components/secondary-menu/secondary-menu.component';
import VacanciesFilterForm from './components/filter/vacancies-filter.container';
import CandidateFilter from './components/filter/candidates-filter.container';
import './hr-page.css';

export default class HRPage extends React.Component {
  render() {
    return (
      <div className="hr-page">
        <HRNavigationBar url="/" activeItem="Interviews" />
        <div className="hr-page_content">
          <Route
            exact
            path={`/`}
            component={() => <Redirect to="/interviews" />}
          />
          <Route
            path={`/interviews`}
            component={() => <InterviewListWrapper />}
          />
          <Route path={`/vacancies`} component={() => <VacancyListWrapper />} />
          <Route
            path={`/candidates`}
            component={() => <CandidateListWrapper />}
          />
          /*<SecondaryMenuComponent />*/
          <VacanciesFilterForm/>
          <CandidateFilter/>
        </div>
      </div>
    );
  }
}
