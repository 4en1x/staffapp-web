import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import InterviewComponent from '../../../components/interview-add-edit-forms/interview.component';
import { getFillList, postInterview } from '../interview-actions';
import './interview-add-page.css';

class AddInterviewPage extends React.Component {
  componentDidMount() {
    this.props.getFillList();
  }

  showResults = values => {
    this.props.postInterview(values);
  };

  render() {
    console.log(this.props.formValues);

    if (this.props.isAddFormLoaded) return <Redirect to="/" />;
    if (!this.props.isFormLoaded) return <p>Not Loaded</p>;

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

export default connect(mapStateToProps, { getFillList, postInterview })(
  AddInterviewPage
);
