import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import InterviewComponent from '../../../components/interview-add-edit-forms/interview.component';
import { getFillList, postInterview, resetInterviewList } from '../interview-actions';
import SemanticLoader from '../../../components/loaders/semantic-loader';

import './interview-add-page.css';

class AddInterviewPage extends React.Component {
  componentDidMount() {
    this.props.getFillList();
  }

  showResults = values => {
    delete values.userNames;
    this.props.postInterview(values);
  };

  componentWillUnmount() {
    this.props.resetInterviewList();
  }

  render() {
    console.log(this.props.formValues);

    if (this.props.isAddFormLoaded) return <Redirect to="/" />;
    if (!this.props.isFormLoaded) return <SemanticLoader />;

    return (
      <div className="interview-page">
        <InterviewComponent
          onSubmit={this.showResults}
          skillsList={this.props.formValues}
        />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isFormLoaded: state.interview.isFormLoaded,
    formValues: state.interview.formValues,
    isAddFormSubmitted: state.interview.isAddFormSubmitted
  };
};

export default connect(mapStateToProps, { getFillList, postInterview, resetInterviewList })(
  AddInterviewPage
);