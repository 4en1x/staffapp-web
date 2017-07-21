import React from "react";
import InterviewComponent from "./components/interview.component";
import { Redirect } from "react-router-dom";
import {getInterviewById} from '../../action-creators/action-creators.js';
import {connect} from 'react-redux';
import SemanticLoader from '../../components/loaders/semantic-loader.js';
import "./interview-page.css";

const data = {
  id: "1",
  skills: ["skill 1", "skill 2", "skill 3", "skill 4"],
  location: "Minsk",
  time: "18:00",
  candidate: {
    name: "Nick",
    surname: "Zabolotskiy"
  }
};

export default class InterviewPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      interview: null,
      isLoaded: false,
      feedbackClicked: false
    };
  }

  componentDidMount() {
    const id = this.props.match.url;
    this.props.getInterviewById(id);
  }

  feedbackClicked = () => {
    console.log('feedback click');
    //this.setState({ feedbackClicked: true });
  };

  render() {
    console.log(this.props.interview);
    const url = this.props.match.url;
    return (
      <div className="interview-page">
        {
          !this.props.interview?
            <SemanticLoader/>:
            <InterviewComponent
              interview={this.props.interview}
              feedbackClicked={this.feedbackClicked}
            />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    interview: state.interview.currentInterview
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getInterviewById: (id) => dispatch(getInterviewById(id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(InterviewPage);
