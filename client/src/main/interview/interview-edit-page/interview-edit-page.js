import React from 'react';
import InterviewComponent from '../../../components/interview-add-edit-forms/interview.component';
import interviewService from '../../../service/interview-service';
import './interview-edit-page.css';

const cities = ['Minsk', 'Pinsk', 'Dobrush', 'Borisov'];
const data = {
  place: 'Pinsk',
  type: 'tech',
  fields: [
    {
      name: 'primaryOne',
      type: 'tech',
      typeSkill: 'primary'
    },
    {
      name: 'secondaryOne',
      type: 'tech',
      typeSkill: 'secondary'
    },
    {
      name: 'secondaryTwo',
      type: 'tech',
      typeSkill: 'secondary'
    },
    {
      name: 'otherOne',
      type: 'tech',
      typeSkill: 'other'
    },
    {
      name: 'otherTwo',
      type: 'tech',
      typeSkill: 'other'
    }
  ],
  users: ['2', '4']
};

export default class EditInterviewPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false
    };
  }
  componentDidMount() {
    interviewService.getEditFormById(this.props.match.params.id).then(res => {
      this.interview = res.data;
      interviewService.getInterviewFillList().then(res => {
        this.lists = res.data;
        this.setState({ isLoaded: true });
      });
    });
  }

  showResults = values => {
    window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  };

  render() {
    // const url = this.props.match.url;
    // if (this.state.feedbackClicked) return <Redirect to={`${url}/feedback`} />;

    return (
      <div className="edit-interview-page">
        {!this.state.isLoaded
          ? <p>Not Loaded</p>
          : <InterviewComponent
              onSubmit={this.showResults}
              //cities={this.candidate.place}
              data={this.candidate.data}
            />}
      </div>
    );
  }
}
