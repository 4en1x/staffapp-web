import React from 'react';
import { connect } from 'react-redux';
import ListComponent from '../../../../../components/list/list.component';
import AdvancedVacancyListItem from '../../../../../components/list/list-items/advanced-vacancy-list-item';

import {
  getCandidateVacancies,
  resetCandidateVacancies
} from '../../../candidate-actions';
import SemanticLoader from '../../../../../components/loaders/semantic-loader';

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

    return (
      <ListComponent
        listItem={AdvancedVacancyListItem}
        elements={this.props.vacancies}
        url={`/vacancies`}
      />
    );
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
