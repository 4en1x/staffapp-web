import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import HRNavigationBar from '../../components/hr-navigation-bar/navigation-bar';
import InterviewListWrapper from '../interview/list-wrapper/interview-list-wrapper';
import CandidateListWrapper from '../candidate/list-wrapper/candidate-list-wrapper';
import VacancyListWrapper from '../vacancy/list-wrapper/vacancy-list-wrapper';
import SecondaryMenuComponent from '../../components/secondary-menu/secondary-menu.component';
import VacanciesFilterForm from './components/filter/vacancies-filter.container';
import CandidateFilter from './components/filter/candidates-filter.container';
import AddButton from '../../components/add-button/add-button';
import HistoryPage from '../history/history-page';
import './hr-page.css';

export default class HRPage extends React.Component {
  render() {
    return (
      <div className="hr-page">
        <HRNavigationBar url="/" activeItem="Interviews" />
        <div className="hr-page_container">
          <Route
            exact
            path={`/`}
            component={() => <Redirect to="/interviews" />}
          />
          <Route
            path={`/interviews`}
            component={() =>
              <div className="hr-page_content">
                <InterviewListWrapper />
                <SecondaryMenuComponent />
              </div>}
          />
          <Route
            path={`/vacancies`}
            component={() =>
              <div className="hr-page_content">
                <VacancyListWrapper />
                <div className="content-right">
                  <AddButton to="/vacancies/add" content="Add vacancy" />
                  <VacanciesFilterForm />
                </div>
              </div>}
          />
          <Route
            path={`/candidates`}
            component={() =>
              <div className="hr-page_content">
                <CandidateListWrapper />
                <div className="content-right">
                  <AddButton to="/candidates/add" content="Add candidate" />
                  <CandidateFilter />
                </div>
              </div>}
          />
          <Route
            path={`/history`}
            component={HistoryPage}
          />
        </div>
      </div>
    );
  }
}
