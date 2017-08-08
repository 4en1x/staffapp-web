import React from 'react';
import { connect } from 'react-redux';
import SemanticLoader from '../../../../components/loaders/semantic-loader';
import { getCandidateList, resetVacancyCandidates } from '../../vacancy-actions';

class CandidatesTab extends React.Component {
  componentDidMount() {
    this.props.getCandidateList(this.props.id);
  }

  componentWillUnmount() {
    this.props.resetVacancyCandidates();
  }

  render() {

    console.log(this.props.candidates);

    if (this.props.candidates) return <SemanticLoader />;

    return <div />;
  }
}

const mapStateToProps = state => {
  return {
    candidates: state.vacancy.candidates
  };
};

export default connect(mapStateToProps, { getCandidateList, resetVacancyCandidates })(CandidatesTab);
