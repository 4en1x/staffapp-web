import React from "react";
import { List } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import {Divider} from 'semantic-ui-react';
import './interview-list-item.css'

const INTERVIEW = {
  name: 'I',
  surname: 'Am',
  date: '08.08.08',
  time: '21 00',
  location: 'Minsk, Belarus',
  primary_skill: 'Javascrtipt'
};

export default class InterviewListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <List.Item className="interview-list-item">
        <List.Content className="interview-list-item-header">
          <Header as="h3" floated='left'>{INTERVIEW.name + ' ' + INTERVIEW.surname}</Header>
          <Header as="h3" floated='right'>{INTERVIEW.time}</Header>
        </List.Content>
        <div className="clear"></div>
        <List.Content className="interview-list-item-desc">
          <List.Description>{INTERVIEW.primary_skill}</List.Description>
        </List.Content>
        <div className="clear"></div>
        <List.Content className="interview-list-item-extra">
          <List.Description className="location">{INTERVIEW.location}</List.Description>
          <List.Description className="date">{INTERVIEW.date}</List.Description>
        </List.Content>
        <div />
        <Divider/>
      </List.Item>
    );
  }
}
