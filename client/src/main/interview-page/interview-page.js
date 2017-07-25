import React from "react";
import InterviewComponent from "./components/interview.component";
import { Redirect } from "react-router-dom";

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
    this.setState({ interview: data, isLoaded: true });
  }

  feedbackClicked = () => {
    this.setState({ feedbackClicked: true });
  };

  render() {
    const url = this.props.match.url;
    if (this.state.feedbackClicked) return <Redirect to={`${url}/feedback`} />;

    return (
      <div className="interview-page">
        {!this.state.isLoaded
          ? <p>Not Loaded</p>
          : <InterviewComponent
              interview={this.state.interview}
              feedbackClicked={this.feedbackClicked}
            />}
      </div>
    );
  }
}
