import React from 'react';
import { List } from 'semantic-ui-react';
import './communications-list.css';

const communicationInfo = {
  last_HR: "Sergey",
  lastConnectionDate: new Date("21.01.2017"),
  vacancy: "Java Developer",
  lastMeetingDate: new Date("11.08.2017"),
  feedBacks: ["10", "20", "21"],
  resume: "http://resume",
  nextConnectionTime: "21 00"
};

const CommunicationsList = props => {
  return (
      <List className='communications-list'>
        <List.Item>
          {communicationInfo.last_HR}
        </List.Item>
        <List.Item>
          {communicationInfo.lastConnectionDate.toDateString()}
        </List.Item>
        <List.Item>
          {communicationInfo.vacancy}
        </List.Item>
        <List.Item>
          {communicationInfo.lastMeetingDate.toDateString()}
        </List.Item>
        <List.Item>
          {communicationInfo.feedBacks}
        </List.Item>
        <List.Item href="#">
          {communicationInfo.resume}
        </List.Item>
        <List.Item>
          {communicationInfo.nextConnectionTime}
        </List.Item>
      </List>
  );
};

export default CommunicationsList;
