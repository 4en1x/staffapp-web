import React from 'react';
import { connect } from 'react-redux';
import {
  getInterviewList,
  resetInterviewList,
  resetCurrentInterview
} from '../interview-actions';
import SemanticLoader from '../../../components/loaders/semantic-loader';
import ListComponent from '../../../components/list/list.component';
import InterviewListItem from '../../../components/list/list-items/interview-list-item';
import { Button } from 'semantic-ui-react';
import './interview-list-wrapper.css';

let counter = 1;
class InterviewListWrapper extends React.Component {
  componentDidMount() {
    this.props.getInterviewList(this.props.filter, 1);
      counter =1;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.filter !== nextProps.filter) {
      this.props.getInterviewList(nextProps.filter);
    }
  }

    nextPage = () => {
        if(counter<this.props.interviews.pagesAmount) this.props.getInterviewList( this.props.filter, ++counter )
    }
    lastPage = () => {
        if(counter>1) this.props.getInterviewList( this.props.filter, --counter )
    }

  componentWillUnmount() {
    this.props.resetInterviewList();
    this.props.resetCurrentInterview();
  }

  render() {
    if (!this.props.interviews) return <SemanticLoader />;
    return (
      <div>
        <ListComponent
          listItem={InterviewListItem}
          elements={this.props.interviews.data}
          url={`/interviews`}
        />
          {props.interviews.pagesAmount !== 0 &&
          <Button.Group size="large" floated="right">
              {counter === 1 && <Button disabled content="previous page"/>}
              {counter !== 1 && <Button onClick={this.lastPage} content="previous page"/>}
            <Button.Or text={counter}/>
              {counter === this.props.interviews.pagesAmount &&
              <Button primary disabled content="next page"/>}
              {counter !== this.props.interviews.pagesAmount &&
              <Button primary onClick={this.nextPage} content="next page"/>}
          </Button.Group>
          }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  interviews: state.interview.interviewList,
  filter: state.interview.filter
});

export default connect(mapStateToProps, {
  getInterviewList,
  resetInterviewList,
  resetCurrentInterview
})(InterviewListWrapper);
