import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getFormValues, postCandidate } from '../candidate-actions';
import Candidate from '../../../components/candidate-add-edit-forms/list/candidate';
import SemanticLoader from '../../../components/loaders/semantic-loader';

class AddCandidatePage extends React.Component {
  componentDidMount() {
    this.props.getFormValues();
  }
  showResults = values => {
    console.log(values);
    this.props.postCandidate(values);
  };

  render() {
    if (this.props.isAddFormSubmitted) return <Redirect to={`/candidates`} />;
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
  isFormLoaded: state.candidate.isFormLoaded,
  formValues: state.candidate.formValues,
  isAddFormSubmitted: state.candidate.isAddFormSubmitted
});

export default connect(mapStateToProps, { getFormValues, postCandidate })(
  AddCandidatePage
);
