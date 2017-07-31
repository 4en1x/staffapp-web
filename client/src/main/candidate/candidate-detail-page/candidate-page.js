import React from 'react';
import { connect } from 'react-redux';
import { getCandidateById } from '../candidate-actions';
import SemanticLoader from '../../../components/loaders/semantic-loader';
import Candidate from './components/candidate';

class CandidatePage extends React.Component {
  componentDidMount() {
    this.props.getCandidateById(this.props.match.params.id);
  }

  render() {
    return (
      <div className="candidate-page">
        {this.props.candidate ? <Candidate candidate={this.props.candidate}/> : <SemanticLoader />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    candidate: state.candidate.currentCandidate
  };
};

export default connect(mapStateToProps, { getCandidateById })(CandidatePage);
