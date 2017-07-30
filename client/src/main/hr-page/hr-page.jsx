import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import HRNavigationBar from '../../components/hr-navigation-bar/navigation-bar';
import InterviewListWrapper from '../interview/list-wrapper/interview-list-wrapper';
import CandidateListWrapper from '../candidate/list-wrapper/candidate-list-wrapper';
import VacancyListWrapper from '../vacancy/list-wrapper/vacancy-list-wrapper';
import SecondaryMenuComponent from '../../components/secondary-menu/secondary-menu.component';
import VacanciesFilterForm from './components/filter/vacancies-filter.container';
import CandidateFilter from './components/filter/candidates-filter.container';
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
                <Link to="/interviews/add">
                  <Button color="twitter">Add</Button>
                </Link>
                <SecondaryMenuComponent />
              </div>}
          />
          <Route
            path={`/vacancies`}
            component={() =>
              <div>
                <VacancyListWrapper />
                <Link to="vacancies/add">
                  <Button color="twitter">Add</Button>
                </Link>
                <VacanciesFilterForm />
              </div>}
          />
          <Route
            path={`/candidates`}
            component={() =>
              <div>
                <CandidateListWrapper />
                <Link to="candidates/add">
                  <Button color="twitter">Add</Button>
                </Link>
                <CandidateFilter />
              </div>}
          />
        </div>
      </div>
    );
  }
}
