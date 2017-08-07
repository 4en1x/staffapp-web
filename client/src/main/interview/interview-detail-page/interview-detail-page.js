import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import InterviewComponent from './components/interview.component';
import SemanticLoader from '../../../components/loaders/semantic-loader';
import * as actionCreators from '../interview-actions';
import './interview-detail-page.css';

class InterviewPage extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getInterviewById(id);
  }

  componentWillUnmount() {
    this.props.resetInterviewList();
    this.props.resetDeletedInterview();
  }

  onDeleteClicked = () => {
    this.props.deleteCurrentInterview(this.props.interview.id);
  };

  render() {

    const url = this.props.match.url;
    const role = this.props.role;

    console.log(this.props.interview);

    if (this.props.isInterviewDeleted) return <Redirect to="/interviews"/>;

    return (
      <div className="interview-page">
        {!this.props.interview
          ? <SemanticLoader />
          : <InterviewComponent interview={this.props.interview} role={role} url={url} onDeleteClicked={this.onDeleteClicked} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  interview: state.interview.currentInterview,
  isInterviewDeleted: state.interview.isInterviewDeleted,
  role: state.auth.role
});

export default connect(mapStateToProps, actionCreators)(InterviewPage);
