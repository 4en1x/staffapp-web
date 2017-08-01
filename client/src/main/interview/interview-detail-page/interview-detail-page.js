import React from 'react';
import { connect } from 'react-redux';
import InterviewComponent from './components/interview.component';
import SemanticLoader from '../../../components/loaders/semantic-loader';
import * as actionCreators from '../interview-actions';
import './interview-detail-page.css';

class InterviewPage extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getInterviewById(id);
    console.log(this.props.interview);
  }

  render() {

    const url = this.props.match.url;
    const role = this.props.role;

    return (
      <div className="interview-page">
        {!this.props.interview
          ? <SemanticLoader />
          : <InterviewComponent interview={this.props.interview} role={role} url={url} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  interview: state.interview.currentInterview,
  role: state.auth.role
});

export default connect(mapStateToProps, actionCreators)(InterviewPage);
