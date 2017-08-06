import React from 'react';
import { connect } from 'react-redux';
import {
  getCandidateHistory,
  resetCandidateHistory
} from '../../../candidate-actions';
import SemanticLoader from '../../../../../components/loaders/semantic-loader';
import HistoryTab from '../tabs/history-tab';

class HistoryWrapper extends React.Component {
  componentDidMount() {
    this.props.getCandidateHistory(this.props.url);
  }

  componentWillUnmount() {
    this.props.resetCandidateHistory();
  }

  render() {
    if (!this.props.history) return <SemanticLoader />;
    console.log(this.props.history);
    return <HistoryTab history={this.props.history} />;
  }
}

const mapStateToProps = state => {
  return {
    history: state.candidate.history
  };
};

export default connect(mapStateToProps, {
  getCandidateHistory,
  resetCandidateHistory
})(HistoryWrapper);
