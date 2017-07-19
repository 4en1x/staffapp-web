import React from "react";

import { Divider, Segment, Button, List } from "semantic-ui-react";

import "./add-technical-feedback-page.css";
import FeedbackTechnicalCard from "../../../components/feedback/feedback-technical-card.jsx";

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
  constructor(props) {
    super(props);
    this.feedbackInfo = {};
  }

  inputHandle = (element, propName) => {
    this.feedbackInfo[propName] = element;
  };

  selectHandle = (value, propName) => {
    this.feedbackInfo[propName].select = value;
  };

  feedbackButtonClicked = () => {
    // this.props.addFeedback();
    const props = Object.keys(this.feedbackInfo);
    props.forEach(prop => {
      this.feedbackInfo[prop].input = this.feedbackInfo[prop].input.ref.value;
    });
    this.props.addFeedback(this.feedbackInfo);
  };

  render() {
    return (
      <div className="add-technical-feedback-page">
        <div className="title-feedback">feedback</div>
        <Divider />
        <Segment id="content-data">
          <div className="labels"> Major skill </div>
          <FeedbackTechnicalCard
            data={major}
            inputHandle={this.inputHandle}
            selectHandle={this.selectHandle}
          />
          <List size="medium">
            <List.Header className="list-header">Minor skills</List.Header>
            {minor.map(step =>
              <List.Item key={step.technology}>
                <FeedbackTechnicalCard
                  inputHandle={this.inputHandle}
                  data={step}
                  selectHandle={this.selectHandle}
                />
              </List.Item>
            )}
          </List>
          <List size="medium">
            <List.Header className="list-header">Other skills</List.Header>
            {other.map(step =>
              <List.Item key={step.technology}>
                <FeedbackTechnicalCard
                  data={step}
                  inputHandle={this.inputHandle}
                  selectHandle={this.selectHandle}
                />
              </List.Item>
            )}
          </List>
        </Segment>
        <div className="add-feedback">
          <Button primary onClick={this.feedbackButtonClicked}>
            Feedback
          </Button>
        </div>
      </div>
    );
  }
}
