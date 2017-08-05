import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import InterviewListWrapper from '../interview/list-wrapper/interview-list-wrapper';
import CandidateListWrapper from '../candidate/list-wrapper/candidate-list-wrapper';
import VacancyListWrapper from '../vacancy/list-wrapper/vacancy-list-wrapper';
import InterviewsMenu from './components/menu/interviews-menu';
import VacanciesFilterForm from './components/filter/vacancies-filter.container';
import CandidateFilter from './components/filter/candidates-filter.container';
import CustomButton from '../../components/custom-button/custom-button';
import HistoryPage from '../history/history-page';
import roles from '../../config/config';
import './main-component.css';

class MainComponent extends React.Component {
  render() {

    console.log(this.props.role);

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
        {this.props.role !== roles.WORKER.ROLE
          ? <div>
              <Route
                path={`/vacancies`}
                component={() =>
                  <div className="page-content">
                    <div className="content-left">
                      <VacancyListWrapper />
                    </div>
                    <div className="content-right">
                      <CustomButton
                        to="/vacancies/add"
                        content="Add vacancy"
                        color="twitter"
                        icon="add"
                      />
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
                      <CustomButton
                        to="/candidates/add"
                        content="Add candidate"
                        color="twitter"
                        icon="add"
                      />
                      <CandidateFilter />
                    </div>
                  </div>}
              />
              <Route path={`/history`} component={() => <HistoryPage />} />
            </div>
          : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    role: state.auth.role
  };
};

export default connect(mapStateToProps)(MainComponent);
