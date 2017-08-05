import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getCandidateById, resetCandidateList, deleteCurrentCandidate, resetDeleteCandidate } from '../candidate-actions';
import SemanticLoader from '../../../components/loaders/semantic-loader';
import Candidate from './components/candidate';

class CandidatePage extends React.Component {
  componentDidMount() {
    this.props.getCandidateById(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.resetCandidateList();
    this.props.resetDeleteCandidate();
  }

  onDeleteClicked = () => {
    this.props.deleteCurrentCandidate(this.props.candidate.id);
  };

  render() {

    if (this.props.isCandidateDeleted) return <Redirect to="/candidates"/>;

    return (
      <div className="candidate-page">
        {this.props.candidate
          ? <Candidate
              candidate={this.props.candidate}
              url={this.props.match.url}
              role={this.props.role}
              onDeleteClicked={this.onDeleteClicked}
            />
          : <SemanticLoader />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    candidate: state.candidate.currentCandidate,
    isCandidateDeleted: state.candidate.isCandidateDeleted,
    role: state.auth.role
  };
};

export default connect(mapStateToProps, {
  getCandidateById,
  resetCandidateList,
  deleteCurrentCandidate,
  resetDeleteCandidate
})(CandidatePage);
