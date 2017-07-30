import React from 'react';
import InterviewComponent from '../../../components/interview-add-edit-forms/interview.component';
import interviewService from '../../../service/interview-service';

import './interview-add-page.css';

const cities = ['Minsk', 'Pinsk', 'Dobrush', 'Borisov'];

export default class ADDInterviewPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false
    };
  }

  componentDidMount() {

    interviewService.getSkillsList().then(res => {
      console.log(res);
      this.skillsList = res.data;
      this.setState({ isLoaded: true });
    });
  }

  showResults = values => {
    interviewService.postInterview(values).then(res => {
      window.alert(res.data);
    });
  };

  render() {
    // const url = this.props.match.url;
    // if (this.state.feedbackClicked) return <Redirect to={`${url}/feedback`} />;

    return (
      <div className="interview-page">
        {!this.state.isLoaded
          ? <p>Not Loaded</p>
          : <InterviewComponent onSubmit={this.showResults} cities={cities} skillsList={this.skillsList}/>}
      </div>
    );
  }
}
