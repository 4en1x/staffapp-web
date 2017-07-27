import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import ListComponent from '../../components/list/list.component';
import SecondaryMenuComponent from '../../components/secondary-menu/secondary-menu.component';
import HRNavigationBar from '../../components/hr-navigation-bar/navigation-bar';
import InterviewListItem from '../../components/list/list-items/interview-list-item';
import CandidatesListItem from '../../components/list/list-items/candidate-list-item';
import VacancyListItem from '../../components/list/list-items/vacancy-list-item';
import { getInterviewList } from '../interview-page/interview-actions';
import { getCandidateList } from '../candidate-detail-page/candidate-actions';
import { getVacancyList } from '../vacany-detail-page/vacancy-actions';
import './hr-page.css';

class HRPage extends React.Component {
  componentDidMount() {
    this.loadData({}, this.props.activeTab);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.activeTab);
    console.log(this.props.activeTab);

    if (nextProps.activeTab !== this.props.activeTab) {
      this.loadData({}, nextProps.activeTab);
    }
  }

  config = () => {
    return {
      Interviews: this.props.getInterviewList,
      Candidates: this.props.getCandidateList,
      Vacancies: this.props.getVacancyList
    };
  };

  loadData = (filter, activeTab) => {
    const config = this.config();
    const loadList = config[activeTab];
    loadList(filter);
  };

  render() {
    const url = '/';
    const interviews = this.props.interviews;
    const candidates = this.props.candidates;
    const vacancies = this.props.vacancies;

    return (
      <div className="hr-page">
        <HRNavigationBar url={url} activeItem="Interviews" />
        <div className="hr-page_content">
          <Route
            exact
            path={`${url}`}
            component={() =>
              <ListComponent
                listItem={InterviewListItem}
                elements={interviews}
                url={`${url}interviews`}
              />}
          />
          <Route
            path={`${url}interviews`}
            component={() =>
              <ListComponent
                listItem={InterviewListItem}
                elements={interviews}
                url={`${url}interviews`}
              />}
          />
          <Route
            path={`${url}vacancies`}
            component={() =>
              <ListComponent
                listItem={VacancyListItem}
                elements={vacancies}
                url={`${url}vacancies`}
              />}
          />
          <Route
            path={`${url}candidates`}
            component={() =>
              <ListComponent
                listItem={CandidatesListItem}
                elements={candidates}
                url={`${url}candidates`}
              />}
          />
          <SecondaryMenuComponent />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    interviews: state.interview.interviewList || [],
    candidates: state.candidate.candidateList || [],
    vacancies: state.vacancy.vacancyList || [],
    activeTab: state.navigationBar.activeTab
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getInterviewList: filter => {
      dispatch(getInterviewList(filter));
    },
    getCandidateList: filter => {
      dispatch(getCandidateList(filter));
    },
    getVacancyList: filter => {
      dispatch(getVacancyList(filter));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HRPage);
