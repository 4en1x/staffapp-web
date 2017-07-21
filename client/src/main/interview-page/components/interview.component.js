import React from "react";
import "./interview-page.css";

import { Divider } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import { List } from "semantic-ui-react";
import { Label } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import { Statistic } from "semantic-ui-react";
import { Card } from "semantic-ui-react";

export default class InterviewComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  onButtonClick = () => {
    this.props.feedbackClicked();
  };
  /* <Search onSearchChange={this.handleSearchChange} />*/
  render() {
    const data = this.props.interview;
    console.log(data);
    return (
      <div className="interview-component">
        <Header dividing as="h2" className="custom-header">
          Technical interview No{data.id}
        </Header>

        <Card fluid className="myCard">
          <div className="info">
            <Statistic className="date" value={data.time} label={data.date}/>
            <div className="horizontal-divider"/>
            <div className="detail-location">
              <Header as="h3">Room 404</Header>
              <Header as="h3">{data.place}</Header>
            </div>
          </div>
          <div className="vertical-divider" />
          <div className="interview-content">
            <Header as="h1">{data.candidate.name} {data.candidate.surname}</Header>
            <Divider hidden />
            <List size="massive">
              <List.Item>Primary skill: {data.skills[0]}</List.Item>
              <List.Item>
                Secondary skills:
                <List
                  className="skills"
                  items={data.skills.slice(1)}
                />
              </List.Item>
            </List>
            <Button color="twitter" floated="right">Feedback</Button>
          </div>
        </Card>
      </div>
    );
  }
}
