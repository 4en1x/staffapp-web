import React from 'react';
import { connect } from 'react-redux';
import { getInterviewList, resetInterviewList, resetCurrentInterview } from '../interview-actions';
import SemanticLoader from '../../../components/loaders/semantic-loader';
import ListComponent from '../../../components/list/list.component';
import InterviewListItem from '../../../components/list/list-items/interview-list-item';
import { Button } from 'semantic-ui-react';
import './interview-list-wrapper.css';

let counter = 1;
class InterviewListWrapper extends React.Component {
  componentDidMount() {
    this.props.getInterviewList(this.props.filter, 1);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.filter !== nextProps.filter) {
      this.props.getInterviewList(nextProps.filter);
    }
  }

  nextData = () => {
    counter++;
    this.props.getInterviewList(this.props.filter, counter);
  };

  prevData = () => {
    if (counter > 1) {
      counter--;
      this.props.getInterviewList(this.props.filter, counter);
    }
  };

  componentWillUnmount() {
    this.props.resetInterviewList();
    this.props.resetCurrentInterview();
  }

  render() {
    if (!this.props.interviews) return <SemanticLoader />;
    if (this.props.interviews.length === 0) {
      counter--;
      this.props.getInterviewList(this.props.filter, counter);
    }
    return (
      <div>
        <ListComponent
          listItem={InterviewListItem}
          elements={this.props.interviews}
          url={`/interviews`}
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
  interviews: state.interview.interviewList,
  filter: state.interview.filter
});

export default connect(mapStateToProps, {
  getInterviewList,
  resetInterviewList,
  resetCurrentInterview
})(InterviewListWrapper);
