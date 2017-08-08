import React from 'react';

import {
  Divider,
  Button,
  List,
  Header,
  Statistic,
  Card
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './interview-page.css';
import roles from '../../../../config/config';

export default class InterviewComponent extends React.Component {
  render() {
    const data = this.props.interview;
      let date = new Date(data.date);
      window.alert(date.toString());
      var mm = date.getMonth() + 1;
      var dd = date.getDate();
      window.alert();
    return (
      <div className="main-component">
        <Header dividing as="h2" className="custom-header">
          Technical interview No{data.id}
        </Header>

        <Card fluid className="row">
          <div className="info">
            <Statistic className="date" value={date.toTimeString().split(' ')[0].slice(0,5)} label={[date.getFullYear(), (mm>9 ? '' : '0') + mm, (dd>9 ? '' : '0') + dd].join('-')} />
            <Divider />
            <Header textAlign="center" as="h2">
              {data.place}
            </Header>
          </div>
          <div className="interview-content">
            <List size="massive" className=" grid-list">
              <List.Item>
                <List.Header>Candidate</List.Header>
                {data.candidate.name} {data.candidate.surname}
              </List.Item>
              <List.Item>
                <List.Header>Interview</List.Header>
                With: {data.type}
              </List.Item>
              <List.Item>
                <List.Header>Vacansy</List.Header>
                {data.vacancy ? data.vacancy : 'No vacancy'}
              </List.Item>
              {data.skills[0] !== null || data.skills.length !== 0
                ? <List.Item>
                    <List.Header>Primary skill</List.Header>
                    {data.skills[0]}
                  </List.Item>
                : null}
              {data.skills[0] !== null || data.skills.length !== 0
                ? <List.Item>
                    <List.Header>Secondary skills</List.Header>
                    <List
                      bulleted
                      className="skills"
                      items={data.skills.slice(1)}
                    />
                  </List.Item>
                : null}
            </List>
            {data.userFeedback
              ? <Link
                  className="button-container"
                  to={`${this.props.url}/feedbacks/${this.props.interview
                    .userFeedback.id}`}
                >
                  <Button color="twitter" floated="right">
                    Feedback
                  </Button>
                </Link>
              : null}
            {this.props.role !== 'user'
              ? <Link
                  className="button-container"
                  to={`${this.props.url}/edit`}
                >
                  <Button
                    content="Edit"
                    icon="edit"
                    labelPosition="left"
                    color="twitter"
                    floated="right"
                  />
                </Link>
              : null}
            {this.props.role === roles.ADMIN.ROLE
              ? <Button
                  content="Delete"
                  icon="edit"
                  labelPosition="left"
                  color="twitter"
                  floated="right"
                  onClick={this.props.onDeleteClicked}
                />
              : null}
          </div>
        </Card>
      </div>
    );
  }
}
