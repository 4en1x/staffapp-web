import React from 'react';
import { List, Header } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const InterviewListItem = props => {
  const interview = props.element;
  const url = props.url;
  const date = new Date(interview.date);
  return (
    <List.Item className="flex-list-item">
      <NavLink to={`${url}/${interview.id}`}>
        <div className="list-item-top">
          <Header as="h2" className="top-left">
            {`${interview.name} ${interview.surname}`}
          </Header>
          <Header as="h2" className="top-right">
            {`0${date.getHours()}`.slice(-2) +
              ':' +
              `0${date.getMinutes()}`.slice(-2)}
          </Header>
        </div>
        <div className="list-item-extra">
          <Header as="h3" content={interview.place} disabled />
          <Header as="h3" content={date.toLocaleDateString()} disabled />
        </div>
      </NavLink>
    </List.Item>
  );
};

export default InterviewListItem;
