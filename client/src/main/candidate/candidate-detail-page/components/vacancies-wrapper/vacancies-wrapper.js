import React from 'react';
import { connect } from 'react-redux';
import { addCurrentCandidateId } from '../../../../hiring-page/hiring-actions';
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
    this.props.addCurrentCandidateId(this.props.candidate.id);
    this.props.resetCandidateVacancies();
  }

  render() {

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
    vacancies: state.candidate.vacancies,
    candidate: state.candidate.currentCandidate
  };
};

export default connect(mapStateToProps, {
  getCandidateVacancies,
  resetCandidateVacancies,
  addCurrentCandidateId
})(VacanciesWrapper);
