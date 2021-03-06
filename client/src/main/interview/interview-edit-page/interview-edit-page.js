import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import InterviewComponent from '../../../components/interview-add-edit-forms/interview.component';
import {
  getFillList,
  patchInterview,
  resetCurrentInterview,
  resetForm
} from '../interview-actions';
import SemanticLoader from '../../../components/loaders/semantic-loader';

import './interview-edit-page.css';

class EditInterviewPage extends React.Component {
  componentDidMount() {
    this.props.getFillList();
  }

  showResults = values => {
    delete values.userNames;
      const dateItem = new Date(values.date + ' ' + values.time);
      values.date = dateItem.toISOString();
      delete values.time;
    this.props.patchInterview(this.props.match.params.id, values);
  };

  componentWillUnmount() {
    this.props.resetCurrentInterview();
    this.props.resetForm();
  }

  render() {
    if (!this.props.formValues) return <SemanticLoader />;
    if (this.props.isFormSubmitted) return <Redirect to="/" />;

    return (
      <div className="page">
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
    formValues: state.interview.formValues,
    isFormSubmitted: state.interview.isFormSubmitted
  };
};

export default connect(mapStateToProps, {
  getFillList,
  patchInterview,
  resetCurrentInterview,
  resetForm
})(EditInterviewPage);
