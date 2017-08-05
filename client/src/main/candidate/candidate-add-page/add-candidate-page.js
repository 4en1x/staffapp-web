import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  getFormValues,
  postCandidate,
  resetCandidateList,
  resetForm
} from '../candidate-actions';
import Candidate from '../../../components/candidate-add-edit-forms/list/candidate';
import SemanticLoader from '../../../components/loaders/semantic-loader';
import './candidate-page.css';

class AddCandidatePage extends React.Component {
  componentDidMount() {
    this.props.getFormValues();
  }
  showResults = values => {
    console.log(values);
    this.props.postCandidate(values);
  };

  componentWillUnmount() {
    this.props.resetCandidateList();
    this.props.resetForm();
  }

  render() {

    if (this.props.isFormSubmitted) return <Redirect to={`/candidates`} />;
    if (!this.props.formValues) return <SemanticLoader />;

    const lists = this.props.formValues;

    return (
      <div className="candidate-page">
        <Candidate
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

const mapStateToProps = state => ({
  formValues: state.candidate.formValues,
  isFormSubmitted: state.candidate.isFormSubmitted
});

export default connect(mapStateToProps, {
  getFormValues,
  postCandidate,
  resetCandidateList,
  resetForm
})(AddCandidatePage);
