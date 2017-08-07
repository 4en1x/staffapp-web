import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  getFormValues,
  patchCandidate,
  resetCurrentCandidate,
  resetForm
} from '../candidate-actions';
import Candidate from '../../../components/candidate-add-edit-forms/list/candidate';
import SemanticLoader from '../../../components/loaders/semantic-loader';

class CandidateEditPage extends React.Component {
  componentDidMount() {
    this.props.getFormValues();
  }

  showResults = values => {
    const id = this.props.match.params.id;
    this.props.patchCandidate(id, values);
  };

  componentWillUnmount() {
    this.props.resetCurrentCandidate();
    this.props.resetForm();
  }

  render() {
    if (this.props.isFormSubmitted)
      return <Redirect to={`/candidates/${this.props.match.params.id}`} />;
    if (!this.props.formValues) return <SemanticLoader />;

    const lists = this.props.formValues;

    return (
      <div className="candidate-page">
        <Candidate
          data={this.props.candidate}
          majorSkills={lists.primarySkills}
          minorSkills={lists.secondarySkills}
          statuses={lists.statuses}
          cities={lists.cities}
          onSubmit={this.showResults}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    candidate: state.candidate.currentCandidate,
    formValues: state.candidate.formValues,
    isFormSubmitted: state.candidate.isFormSubmitted
  };
};

export default connect(mapStateToProps, {
  getFormValues,
  patchCandidate,
  resetCurrentCandidate,
  resetForm
})(CandidateEditPage);
