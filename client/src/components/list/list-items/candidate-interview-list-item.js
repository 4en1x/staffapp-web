import React from 'react';
import { List, Header } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const CandidateInterviewListItem = props => {
  const interview = props.element;
  const url = props.url;
  const date = new Date(interview.date);
  return (
    <List.Item className="flex-list-item">
      <NavLink to={`${url}/${interview.id}`}>
        <div className="list-item-top">
          <Header as="h2" className="top-left">
            {interview.type}
          </Header>
          <Header as="h2" className="top-right">
            {date.toLocaleTimeString()}
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

export default CandidateInterviewListItem;
