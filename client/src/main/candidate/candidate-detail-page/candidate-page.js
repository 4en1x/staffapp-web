import React from 'react';
import { connect } from 'react-redux';
import { getCandidateById, resetCandidateList } from '../candidate-actions';
import SemanticLoader from '../../../components/loaders/semantic-loader';
import Candidate from './components/candidate';

class CandidatePage extends React.Component {
  componentDidMount() {
    this.props.getCandidateById(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.resetCandidateList();
  }

  render() {
    return (
      <div className="candidate-page">
        {this.props.candidate
          ? <Candidate
              candidate={this.props.candidate}
              url={this.props.match.url}
            />
          : <SemanticLoader />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    candidate: state.candidate.currentCandidate,
    role: state.auth.role
  };
};

export default connect(mapStateToProps, {
  getCandidateById,
  resetCandidateList
})(CandidatePage);
