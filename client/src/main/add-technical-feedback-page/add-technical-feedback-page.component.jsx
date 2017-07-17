import React from "react";

import { Divider, Segment, Button, List } from "semantic-ui-react";

import "./add-technical-feedback-page.css";
import "../interview-page/interview-page.css";
import FeedbackTechnicalCard from "./components/feedback-technical-card";

const major = {
  technology: "javascript"
};
const minor = [
  {
    technology: "c++"
  },
  {
    technology: ".net"
  },
  {
    technology: "react"
  }
];
const other = [
  {
    technology: "jogging"
  },
  {
    technology: "fishing"
  },
  {
    technology: "reading"
  }
];

export default class AddTechnicalFeedbackPage extends React.Component {
  addFeedback = () => {
    // TODO: ... some action needed ...
  };

  render() {
    return (
      <div className="add-technical-feedback-page">
        <div className="title-feedback">feedback</div>
        <Divider />
        <Segment id="content-data">
          <div className="labels"> Major skill </div>
          <FeedbackTechnicalCard data={major} />
          <List size="medium">
            <List.Header className="list-header">Minor skills</List.Header>
            {minor.map(step =>
              <List.Item key={step.technology}>
                <FeedbackTechnicalCard data={step} />
              </List.Item>
            )}
          </List>
          <List size="medium">
            <List.Header className="list-header">Other skills</List.Header>
            {other.map(step =>
              <List.Item key={step.technology}>
                <FeedbackTechnicalCard data={step} />
              </List.Item>
            )}
          </List>
        </Segment>
        <div className="add-feedback">
          <Button primary onClick={this.addFeedback}>
            Feedback
          </Button>
        </div>
      </div>
    );
  }
}
