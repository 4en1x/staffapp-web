import React from 'react';
import { connect } from 'react-redux';
import ListComponent from '../../../../../components/list/list.component';
import CandidateListItem from '../../../../../components/list/list-items/candidate-list-item';
import { addCurrentVacancyId } from '../../../../hiring-page/hiring-actions';

import {
  getVacancyCandidates,
  resetVacancyCandidates
} from '../../../vacancy-actions';
import SemanticLoader from '../../../../../components/loaders/semantic-loader';

class CandidatesWrapper extends React.Component {
  componentDidMount() {
    this.props.getVacancyCandidates(this.props.url);
  }

  componentWillUnmount() {
    this.props.addCurrentVacancyId(this.props.vacancy.id);
    this.props.resetVacancyCandidates();
  }

  render() {
    if (!this.props.candidates) return <SemanticLoader />;
    return (
      <ListComponent
        listItem={CandidateListItem}
        elements={this.props.candidates}
        url={`hiring`}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    candidates: state.vacancy.candidates,
    vacancy: state.vacancy.currentVacancy
  };
};

export default connect(mapStateToProps, {
  getVacancyCandidates,
  resetVacancyCandidates,
  addCurrentVacancyId
})(CandidatesWrapper);

