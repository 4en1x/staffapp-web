import React from "react";

import {
  Divider,
  Button,
  List,
  Header,
  Statistic,
  Card
} from "semantic-ui-react";

import "./interview-page.css";

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
        <Header dividing as="h2">
          Technical interview {data.id}
        </Header>

        <Card fluid className="row">
          <div className="info">
            <Statistic className="date" value={data.time} label="01.01.1997" />
            <Divider />
            <Header textAlign="center" as="h2">
              Room 404
              <Header.Subheader>City, Country </Header.Subheader>
            </Header>
          </div>
          <div className="interview-content">
            <List size="massive" className="grid-list">
              <List.Item className="flex-block">
                <List.Header>Interviewee</List.Header>
                {data.candidate.name} {data.candidate.surname}
              </List.Item>
              <List.Item className="flex-block">
                <List.Header>Interviewer</List.Header>
                Anatoliy Levakov
              </List.Item>
              <List.Item className="flex-block">
                <List.Header>Vacansy</List.Header>
                Junior JS Developer
              </List.Item>
              <List.Item className="flex-block">
                <List.Header>Primary skill</List.Header>
                {data.skills[0]}
              </List.Item>
              <List.Item className="flex-block">
                <List.Header>Secondary skills</List.Header>
                <List
                  bulleted
                  className="skills"
                  items={data.skills.slice(1)}
                />
              </List.Item>
            </List>
          </div>
        </Card>
        <Button color="twitter" floated="right">
          Feedback
        </Button>
      </div>
    );
  }
}
