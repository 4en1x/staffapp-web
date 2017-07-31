import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import InterviewComponent from '../../../components/interview-add-edit-forms/interview.component';
import {
  getFillList,
  postInterview,
  patchInterview
} from '../interview-actions';
import SemanticLoader from '../../../components/loaders/semantic-loader';

import './interview-edit-page.css';

class EditInterviewPage extends React.Component {
  componentDidMount() {
    this.props.getFillList();
  }

  showResults = values => {
    console.log(values);
    delete values.userNames;
    this.props.patchInterview(this.props.match.params.id, values);
  };

  render() {
    console.log(this.props.formValues);

    if (!this.props.isFormLoaded) return <SemanticLoader />;
    if (this.props.isEditFormSubmitted) return <Redirect to="/" />;

    return (
      <div className="edit-interview-page">
        <InterviewComponent
          onSubmit={this.showResults}
          data={this.props.interview}
          skillsList={this.props.formValues}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    interview: state.interview.currentInterview,
    isFormLoaded: state.interview.isFormLoaded,
    formValues: state.interview.formValues,
    isEditFormSubmitted: state.interview.isEditFormSubmitted
  };
};

export default connect(mapStateToProps, {
  getFillList,
  postInterview,
  patchInterview
})(EditInterviewPage);
