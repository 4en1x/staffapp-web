import React from "react";
import FeedbackTechnicalCard from "./components/add-technical-feedback-page.component.jsx";
import { Redirect } from "react-router-dom";

export default class TechnicalFeedback extends React.Component {
  constructor() {
    super();
    this.state = {
      isFeedbackSent: false
    };
  }

  addFeedback = feedback => {
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
