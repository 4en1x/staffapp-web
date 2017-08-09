import React from 'react';
import { connect } from 'react-redux';
import InterviewComponent from '../../../components/interview-add-edit-forms/interview.component';
import {
  getFillList,
  postInterview,
  resetInterviewList
} from '../interview-actions';
import SemanticLoader from '../../../components/loaders/semantic-loader';

import './interview-add-page.css';

class AddInterviewPage extends React.Component {
  componentDidMount() {
    this.props.getFillList();
  }

  showResults = values => {
    delete values.userNames;
    const dateItem = new Date(values.date + ' ' + values.time);
    values.date = dateItem.toISOString();
    delete values.time;
    this.props.postInterview(values);
  };

  componentWillUnmount() {
    this.props.resetInterviewList();
  }

  render() {
    if (!this.props.isFormLoaded) return <SemanticLoader />;

    return (
      <div className="page">
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

export default connect(mapStateToProps, {
  getFillList,
  postInterview,
  resetInterviewList
})(AddInterviewPage);
