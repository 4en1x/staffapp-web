import React from 'react';
import { connect } from 'react-redux';
import { getCandidateList } from '../candidate-actions';
import SemanticLoader from '../../../components/loaders/semantic-loader';
import ListComponent from '../../../components/list/list.component';
import CandidateListItem from '../../../components/list/list-items/candidate-list-item';
import './candidate-list-wrapper.css';

class CandidateListWrapper extends React.Component {
  componentDidMount() {
    this.props.getCandidateList(this.props.filter);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.filter !== nextProps.filter) {
      console.log('here');
      console.log(nextProps.filter);
      console.log('here');
      this.props.getCandidateList(nextProps.filter);
    }
  }

  render() {
    if (!this.props.candidates) return <SemanticLoader />;

    return (
      <ListComponent
        listItem={CandidateListItem}
        elements={this.props.candidates}
        url={`/candidates`}
      />
    );
  }
}

const mapStateToProps = state => ({
  candidates: state.candidate.candidateList,
  filter: state.candidate.filter
});

export default connect(mapStateToProps, { getCandidateList })(
  CandidateListWrapper
);
