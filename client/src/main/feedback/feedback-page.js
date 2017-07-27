import React from 'react';
import FeedbackView from './components/feedback-view';

const inputData = {
  id: 1,
  userId: 2,
  interviewId: 1,
  candidateId: 1,
  comment: null,
  status: 1,
  fields: [
    {
      id: 16,
      name: 'ascel',
      value: null,
      comment: null,
      typeSkill: 'secondary',
      type: 'tech'
    },
    {
      id: 23,
      name: 'english level',
      value: null,
      comment: null,
      typeSkill: 'other',
      type: 'tech'
    },
    {
      id: 45,
      name: 'beauty',
      value: null,
      comment: null,
      typeSkill: 'other',
      type: 'tech'
    },
    {
      id: 19,
      name: 'c++',
      value: null,
      comment: null,
      typeSkill: 'secondary',
      type: 'tech'
    },
    {
      id: 17,
      name: 'ruby',
      value: '123',
      comment: 'not very vell',
      typeSkill: 'primary',
      type: 'tech'
    }
  ]
};

export default class FeedbackPage extends React.Component {

  componentDidMount() {

  }

  onSubmitClicked = () => {
    console.log('lallala');
  };

  render() {
    return <FeedbackView onSubmitClicked={this.onSubmitClicked} data={inputData} />;
  }
}
