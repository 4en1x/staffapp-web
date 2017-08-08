import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import {
  getCandidateList,
  resetCandidateList,
  resetCurrentCandidate
} from '../candidate-actions';
import SemanticLoader from '../../../components/loaders/semantic-loader';
import ListComponent from '../../../components/list/list.component';
import CandidateListItem from '../../../components/list/list-items/candidate-list-item';
import './candidate-list-wrapper.css';

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

  componentWillUnmount() {
    this.props.resetCandidateList();
    this.props.resetCurrentCandidate();
  }

  render() {
    if (!this.props.candidates.data) return <SemanticLoader />;
    return (
      <div>
        <ListComponent
          listItem={CandidateListItem}
          elements={this.props.candidates.data}
          url={`/candidates`}
        />
        <Button.Group size="large" floated="right">
            {counter === 1 && <Button disabled content="previous page" />}
            {counter !== 1 &&
            <Button
                onClick={this.props.getCandidateList(
                    this.props.filter,
                    --counter
                )}
                content="previous page"
            />}
          <Button.Or text={counter} />
            {counter === this.props.candidates.pagesAmount / 10 &&
            <Button primary disabled content="next page" />}
            {counter !== 1 &&
            <Button
                primary
                onClick={this.props.getCandidateList(
                    this.props.filter,
                    ++counter
                )}
                content="next page"
            />}
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
