import React from 'react';
import { connect } from 'react-redux';
import { getCandidateList } from '../../candidate-detail-page/candidate-actions';
import SemanticLoader from '../../../components/loaders/semantic-loader';
import ListComponent from '../../../components/list/list.component';
import CandidateListItem from '../../../components/list/list-items/candidate-list-item';
import './list-wrapper.css';

class CandidateListWrapper extends React.Component {
  componentDidMount() {
    this.props.getCandidateList();
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
  candidates: state.candidate.candidateList
});

export default connect(mapStateToProps, { getCandidateList })(
  CandidateListWrapper
);
