import React from 'react';
import { NavLink } from 'react-router-dom';
import { List, Header } from 'semantic-ui-react';

const VacancyListItem = props => {
  const vacancy = props.element;
  const url = props.url;

  return (
    <List.Item className="flex-list-item">
      <NavLink to={`${url}/${vacancy.id}`}>
        <div className="list-item-top">
          <Header as="h2" className="top-left">
            {vacancy.name}
          </Header>
          <Header as="h2" className="top-right">
            {vacancy.status}
          </Header>
        </div>
        <div className="list-item-extra">
          <span className="extra-left">
            {vacancy.city}
          </span>
          <span className="extra-right">
            {vacancy.jobStart}
          </span>
        </div>
      </NavLink>
    </List.Item>
  );
};

export default VacancyListItem;
