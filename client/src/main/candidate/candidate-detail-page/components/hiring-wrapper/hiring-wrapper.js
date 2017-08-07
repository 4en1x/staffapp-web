import React from 'react';
import { connect } from 'react-redux';
import {
  getCandidateHiring,
  resetCandidateHiring
} from '../../../candidate-actions';
import SemanticLoader from '../../../../../components/loaders/semantic-loader';
import HiringsTab from '../tabs/hirings-tab';

class HiringWrapper extends React.Component {
  componentDidMount() {
    this.props.getCandidateHiring(this.props.url);
  }

  componentWillUnmount() {
    this.props.resetCandidateHiring();
  }

  render() {
    if (!this.props.hiring) return <SemanticLoader />;
    console.log(this.props.hiring);
    return <HiringsTab hirings={this.props.hiring} />;
  }
}

const mapStateToProps = state => {
  return {
    hiring: state.candidate.hiring
  };
};

export default connect(mapStateToProps, {
  getCandidateHiring,
  resetCandidateHiring
})(HiringWrapper);
