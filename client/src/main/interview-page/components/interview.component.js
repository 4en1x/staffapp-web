import React from "react";
import "./interview-page.css";
import FeedbackList from "./feedback-list";

import { Search } from "semantic-ui-react";
import { Divider } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import { List } from "semantic-ui-react";
import { Label } from "semantic-ui-react";
import { Segment } from "semantic-ui-react";

export default class InterviewComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  onButtonClick = () => {
    this.props.feedbackClicked();
  };

  render() {
    const data = this.props.interview;

    return (
      <div>
        <div className="title">
          <div className="candidate-title">
            {" "}{data.candidate}{" "}
          </div>
          <Search onSearchChange={this.handleSearchChange} />
        </div>

        <Divider />

        <Segment id="content">
          <Label as="a" color="teal" ribbon="right" size="huge">
            {" "}{data.status}{" "}
          </Label>

          <List size="huge">
            <List.Item>
              <List.Header>Skills</List.Header>
              <List items={data.skills} />
            </List.Item>

            <List.Item>
              <List.Header>Location</List.Header>
              {data.location}
            </List.Item>

            <List.Item>
              <List.Header>Feedbacks</List.Header>
              <FeedbackList
                feedbacks={data.feedbacks}
                authorFeedback={data.authorFeedback}
              />
            </List.Item>
          </List>
        </Segment>

        <div className="add-feedback">
          <Button primary onClick={this.onButtonClick}>
            {" "}Feedback{" "}
          </Button>
        </div>
      </div>
    );
  }
}
