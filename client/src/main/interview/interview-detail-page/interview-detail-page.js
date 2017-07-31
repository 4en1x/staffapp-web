import React from 'react';
import { connect } from 'react-redux';
import InterviewComponent from './components/interview.component';
import InvertedLoader from '../../../components/loaders/inverted-loader';
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
    return (
      <div className="interview-page">
        {!this.props.interview
          ? <InvertedLoader />
          : <InterviewComponent interview={this.props.interview} url={url} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  interview: state.interview.currentInterview
});

export default connect(mapStateToProps, actionCreators)(InterviewPage);
