import React from 'react';
import FeedbackItem from './feedback-item';

import {
  Divider,
  Button,
  List,
  Header,
  Statistic,
  Card
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import LinkIconButton from '../../../../components/custom-button/link-icon-button';

import './interview-page.css';
import roles from '../../../../config/config';

export default class InterviewComponent extends React.Component {
  render() {
    const data = this.props.interview;
    let date = new Date(data.date);
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    console.log(data);
    return (
      <div className="page-content">
        <div className=" content-tab background padded ">
          <Header as="h1" content={`Interview ${data.id}`} />
          <div className="buttons">
            <span className="span-label">
              with {data.type.toLowerCase()}
            </span>
          </div>
        </div>

        <div className="content-thin">
          <div className="content-tab background padded column">
            <div className="content-cell child-centered">
              <Statistic
                className="date"
                value={date.toTimeString().split(' ')[0].slice(0, 5)}
                label={[
                  (dd > 9 ? '' : '0') + dd,
                  (mm > 9 ? '' : '0') + mm,
                  date.getFullYear()
                ].join('.')}
              />
            </div>
            <Divider />
            <div className="content-cell child-centered">
              <Header textAlign="center" as="h3">
                {data.place}
              </Header>
            </div>
          </div>
          {data.userFeedback
            ? <LinkIconButton
                to={`${this.props.url}/feedbacks/${this.props.interview
                  .userFeedback.id}`}
                content="Give feedback"
                color="twitter"
                icon="reply"
                labelPosition="left"
              />
            : null}
        </div>

        <div className="content-wide">
          <div className="content-tab background padded">
            <List size="massive" className=" grid-list">
              <List.Item>
                <List.Header>Candidate</List.Header>
                {data.candidate.name} {data.candidate.surname}
              </List.Item>
              {data.vacancy
                ? <List.Item>
                    <List.Header content="Vacancy" />
                    {data.vacancy}{' '}
                  </List.Item>
                : null}
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
            {this.props.role !== roles.WORKER.ROLE
              ? data.feedbacks.map(
                  item =>
                    item.status ? <FeedbackItem feedback={item} /> : null
                )
              : null}
            <div className="buttons">
              {this.props.role !== 'user'
                ? <Link
                    className="button-container"
                    to={`${this.props.url}/edit`}
                  >
                    <Button
                      content="Edit"
                      icon="edit"
                      labelPosition="left"
                      color="default"
                    />
                  </Link>
                : null}
              {this.props.role === roles.ADMIN.ROLE
                ? <Button
                    content="Delete"
                    icon="edit"
                    labelPosition="left"
                    color="default"
                    onClick={this.props.onDeleteClicked}
                  />
                : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
