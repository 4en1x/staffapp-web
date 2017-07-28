import React from "react";

import {
  Divider,
  Button,
  List,
  Header,
  Statistic,
  Card
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./interview-page.css";

export default class InterviewComponent extends React.Component {
  render() {
    const data = this.props.interview;
    return (
      <div className="interview-component">
        <Header dividing as="h2" className="custom-header">
          Technical interview No{data.id}
        </Header>

        <Card fluid className="row">
          <div className="info">
            <Statistic className="date" value={data.time} label={data.date} />
            <Divider />
            <Header textAlign="center" as="h2">
              Room 404
              <Header.Subheader> {data.place}</Header.Subheader>
            </Header>
          </div>
          <div className="interview-content">
            <List size="massive" className=" grid-list">
              <List.Item>
                <List.Header>Interviewee</List.Header>
                {data.candidate.name} {data.candidate.surname}
              </List.Item>
              <List.Item>
                <List.Header>Interviewer</List.Header>
                Anatoliy Levakov
              </List.Item>
              <List.Item>
                <List.Header>Vacansy</List.Header>
                Junior JS Developer
              </List.Item>
              <List.Item>
                <List.Header>Primary skill</List.Header>
                {data.skills[0]}
              </List.Item>
              <List.Item>
                <List.Header>Secondary skills</List.Header>
                <List
                  bulleted
                  className="skills"
                  items={data.skills.slice(1)}
                />
              </List.Item>
            </List>
            <Link
              className="button-container"
              to={`${this.props.url}/feedback/${this.props.interview
                .feedbacks[0].id}`}
            >
              <Button color="twitter" floated="right">
                Feedback
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }
}
