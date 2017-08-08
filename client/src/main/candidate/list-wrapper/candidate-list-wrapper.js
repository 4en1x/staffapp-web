import React from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
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

let counter;
class CandidateListWrapper extends React.Component {
  componentDidMount() {
    this.props.getCandidateList(this.props.filter);
    counter =1;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.filter !== nextProps.filter) {
      this.props.getCandidateList(nextProps.filter);
    }
  }

    nextPage = () => {
    if(counter<this.props.candidates.pagesAmount) this.props.getCandidateList( this.props.filter, ++counter )
    }
    lastPage = () => {
    if(counter>1) this.props.getCandidateList( this.props.filter, --counter )
    }

  componentWillUnmount() {
    this.props.resetCandidateList();
    this.props.resetCurrentCandidate();
  }

  render() {
    if (!this.props.candidates) return <SemanticLoader />;
    return (
      <div>
        <ListComponent
          listItem={CandidateListItem}
          elements={this.props.candidates.data}
          url={`candidates`}
        />
          {this.props.candidates.pagesAmount !== 0 &&
          <Button.Group size="large" floated="right">
              {counter === 1 && <Button disabled content="previous page"/>}
              {counter !== 1 && <Button onClick={this.lastPage} content="previous page"/>}
            <Button.Or text={counter}/>
              {counter === this.props.candidates.pagesAmount &&
              <Button primary disabled content="next page"/>}
              {counter !== this.props.candidates.pagesAmount &&
              <Button primary onClick={this.nextPage} content="next page"/>}
          </Button.Group>
          }
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
  resetCurrentCandidate,
  reset
})(CandidateListWrapper);
