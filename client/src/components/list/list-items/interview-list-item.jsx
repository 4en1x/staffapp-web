import React from "react";
import {List, Header} from "semantic-ui-react";
import "./interview-list-item.css";

let InterviewListItem = (props) => {

  const interview = props.element;

  return (
    <List.Item className="flex-interview-list-item">
      <div className="interview-list-item-header">
        <Header as="h2" className="name">
          {`${interview.name} ${interview.surname}`}
        </Header>
        <Header as="h2" className="time">
          {interview.time}
        </Header>
      </div>
      <span className="interview-list-item-description">
          {interview.primarySkill}
        </span>
      <div className="interview-list-item-extra">
          <span className="location">
            {interview.location}
          </span>
        <span className="date">
            {interview.date}
          </span>
      </div>
    </List.Item>
  );
};

export default InterviewListItem;


