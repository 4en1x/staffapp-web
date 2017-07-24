import React from "react";
import { List, Header } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

import "./interview-list-item.css";

const InterviewListItem = props => {
  const interview = props.element;
  const url = props.url;

  return (
    <List.Item className="flex-interview-list-item">
      <NavLink to={`${url}/${interview.id}`}>
        <div className="interview-list-item-header">
          <Header href="/interviews/111" as="h2" className="name">
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
            {interview.place}
          </span>
          <span className="date">
            {interview.date}
          </span>
        </div>
      </NavLink>
    </List.Item>
  );
};

export default InterviewListItem;
