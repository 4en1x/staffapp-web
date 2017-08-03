import React from 'react';
import { connect } from 'react-redux';
import {
  getCandidateVacancies,
  resetCandidateVacancies
} from '../../../candidate-actions';
import SemanticLoader from '../../../../../components/loaders/semantic-loader';
import VacanciesTab from '../tabs/vacancies-tab';

class VacanciesWrapper extends React.Component {
  componentDidMount() {
    this.props.getCandidateVacancies(this.props.url);
  }

  componentWillUnmount() {
    this.props.resetCandidateVacancies();
  }

  render() {

    console.log(this.props.vacancies);

    if (!this.props.vacancies) return <SemanticLoader />;

    return <VacanciesTab vacancies={this.props.vacancies} />;
  }
}

const mapStateToProps = state => {
  return {
    vacancies: state.candidate.vacancies
  };
};

export default connect(mapStateToProps, {
  getCandidateVacancies,
  resetCandidateVacancies
})(VacanciesWrapper);
