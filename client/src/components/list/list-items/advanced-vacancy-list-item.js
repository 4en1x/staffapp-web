import React from 'react';
import { NavLink } from 'react-router-dom';
import { List, Header } from 'semantic-ui-react';

const AdvancedVacancyListItem = props => {
  const vacancy = props.element;
  const url = props.url;

  return (
    <List.Item className="flex-list-item">
      <a>
        <div className="list-item-top">
          <Header as="h2" className="top-left">
            {vacancy.name}
          </Header>
          <Header as="h2" className="top-right">
            {vacancy.status}
          </Header>
        </div>

        <div className="list-item-extra">
          <Header
            as="h3"
            content={`${vacancy.primarySkill}${vacancy.secondarySkills
              ? ` and ${vacancy.secondarySkills.join(', ')}`
              : ''}`}
            disabled
          />
          <Header as="h3" content={vacancy.jobStart} disabled />
        </div>
      </a>
    </List.Item>
  );
};

export default AdvancedVacancyListItem;
