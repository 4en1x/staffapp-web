import React from "react";
import { List } from "semantic-ui-react";
import { Divider } from "semantic-ui-react";
import "./interview-list-item.css";

const InterviewListItem = props => {
  const interview = props.interview;

  return (
    <List.Item className="flex-interview-list-item">
      <div className="interview-list-item-header">
        <div className="name">
          {interview.name + " " + interview.surname}
        </div>
        <div className="time">
          {interview.time}
        </div>
      </div>
      <div className="interview-list-item-description">
        <div className="description">
          {interview.primary_skill}
        </div>
      </div>
      <div className="interview-list-item-extra">
        <div className="location">
          {interview.location}
        </div>
        <div className="date">
          {interview.date}
        </div>
      </div>
      <Divider />
    </List.Item>
  );
};

export default InterviewListItem;
