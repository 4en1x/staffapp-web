import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  getFormValues,
  patchCandidate,
  resetCurrentCandidate
} from '../candidate-actions';
import Candidate from '../../../components/candidate-add-edit-forms/list/candidate';
import SemanticLoader from '../../../components/loaders/semantic-loader';

class CandidateEditPage extends React.Component {
  componentDidMount() {
    this.props.getFormValues();
  }

  showResults = values => {
    console.log(values);
    const id = this.props.match.params.id;
    this.props.patchCandidate(id, values);
  };

  componentWillUnmount() {
    this.props.resetCurrentCandidate();
  }

  render() {
    if (this.props.isEditFormSubmitted)
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
