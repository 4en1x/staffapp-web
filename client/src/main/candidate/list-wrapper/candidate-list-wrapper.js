import React from 'react';
import { connect } from 'react-redux';
import {
  getCandidateList,
  resetCandidateList,
  resetCurrentCandidate
} from '../candidate-actions';
import SemanticLoader from '../../../components/loaders/semantic-loader';
import ListComponent from '../../../components/list/list.component';
import CandidateListItem from '../../../components/list/list-items/candidate-list-item';
import './candidate-list-wrapper.css';
import { Button } from 'semantic-ui-react';

let counter = 1;
class CandidateListWrapper extends React.Component {
  componentDidMount() {
    this.props.getCandidateList(this.props.filter);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.filter !== nextProps.filter) {
      this.props.getCandidateList(nextProps.filter);
    }
  }
  nextData = () => {
    counter++;
    this.props.getCandidateList(this.props.filter, counter);
  };

  prevData = () => {
    if (counter > 1) {
      counter--;
      this.props.getCandidateList(this.props.filter, counter);
    }
  };

  componentWillUnmount() {
    this.props.resetCandidateList();
    this.props.resetCurrentCandidate();
  }

  render() {
    if (!this.props.candidates) return <SemanticLoader />;

    console.log(this.props.candidates);

    return (
      <div>
        <ListComponent
          listItem={CandidateListItem}
          elements={this.props.candidates}
          url={`/candidates`}
        />
        <Button.Group size='large' floated="right">
            {counter === 1 && <Button onClick={this.prevData} disabled> previous page </Button>}
            {counter !== 1 && <Button onClick={this.prevData}> previous page </Button>}
          <Button.Or text={counter} />
          <Button primary onClick={this.nextData}> next page</Button>
        </Button.Group>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  candidates: state.candidate.candidateList,
  filter: state.candidate.filter
});

export default connect(mapStateToProps, {
  getCandidateList,
  resetCandidateList,
  resetCurrentCandidate
})(CandidateListWrapper);
