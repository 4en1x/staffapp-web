import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
// import HRNavigationBar from '../../components/hr-navigation-bar/navigation-bar';
import InterviewListWrapper from '../interview/list-wrapper/interview-list-wrapper';
import CandidateListWrapper from '../candidate/list-wrapper/candidate-list-wrapper';
import VacancyListWrapper from '../vacancy/list-wrapper/vacancy-list-wrapper';
import InterviewsMenu from './components/menu/interviews-menu';
import VacanciesFilterForm from './components/filter/vacancies-filter.container';
import CandidateFilter from './components/filter/candidates-filter.container';
import AddButton from '../../components/add-button/add-button';
import HistoryPage from '../history/history-page';
import './hr-page.css';

export default class HRPage extends React.Component {
  render() {
    return (
      <div className="hr-page">
        <Route
          exact
          path={`/`}
          component={() => <Redirect to="/interviews" />}
        />
        <Route
          path={`/interviews`}
          component={() =>
            <div className="page-content">
              <div className="content-left">
                <InterviewListWrapper />
              </div>
              <div className="content-right">
                <InterviewsMenu />
              </div>
            </div>}
        />
        <Route
          path={`/vacancies`}
          component={() =>
            <div className="page-content">
              <div className="content-left">
                <VacancyListWrapper />
              </div>
              <div className="content-right">
                <AddButton to="/vacancies/add" content="Add vacancy" />
                <VacanciesFilterForm />
              </div>
            </div>}
        />
        <Route
          path={`/candidates`}
          component={() =>
            <div className="page-content">
              <div className="content-left">
                <CandidateListWrapper />
              </div>
              <div className="content-right">
                <AddButton to="/candidates/add" content="Add candidate" />
                <CandidateFilter />
              </div>
            </div>}
        />
        <Route
          path={`/history`}
          component={() =>
            <div className="page-content">
              <div className="content-left">
                <HistoryPage />
              </div>
              <div className="content-right" />
            </div>}
        />
      </div>
    );
  }
}
