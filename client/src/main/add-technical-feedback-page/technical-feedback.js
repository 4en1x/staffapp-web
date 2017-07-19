import React from "react";
import FeedbackTechnicalCard from "./components/add-technical-feedback-page.component.jsx";
import { Redirect } from "react-router-dom";

export default class TechnicalFeedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFeedbackSend: false
    };
  }

  // on this method we create reques to server and post feedback,
  // after create component <Reditect> to worker page
  addFeedback = feedback => {
    console.log(feedback);
    this.setState({ isFeedbackSend: true });
  };

  render() {
    if (this.state.isFeedbackSend) return <Redirect to="/" />;

    return (
      <div>
        <FeedbackTechnicalCard addFeedback={this.addFeedback} />
      </div>
    );
  }
}
