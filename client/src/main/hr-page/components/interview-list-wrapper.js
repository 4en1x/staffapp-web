import React from 'react';
import { connect } from 'react-redux';
import { getInterviewList } from '../../interview-page/interview-actions';
import SemanticLoader from '../../../components/loaders/semantic-loader';
import ListComponent from '../../../components/list/list.component';
import InterviewListItem from '../../../components/list/list-items/interview-list-item';
import './list-wrapper.css';

class InterviewListWrapper extends React.Component {
  componentDidMount() {
    this.props.getInterviewList(this.props.filter);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.filter !== nextProps.filter) {
      this.props.getInterviewList(nextProps.filter);
    }
  }

  render() {

    if (!this.props.interviews) return <SemanticLoader />;

    return (
      <ListComponent
        listItem={InterviewListItem}
        elements={this.props.interviews}
        url={`/interviews`}
      />
    );
  }
}

const mapStateToProps = state => ({
  interviews: state.interview.interviewList,
  filter: state.interview.filter
});

export default connect(mapStateToProps, { getInterviewList })(
  InterviewListWrapper
);
