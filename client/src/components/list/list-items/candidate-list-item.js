import React from 'react';
import { NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { List, Header } from 'semantic-ui-react';

const CandidateListItem = props => {
  const data = props.element;
  const url = props.url;

  return (
    <List.Item className="flex-list-item">
      <NavLink to={`${url}/${data.id}`}>
        <div className="list-item-top">
          <Header as="h2" className="top-left">
            {data.name} {data.surname}
          </Header>
          <Header as="h2" className="top-right">
            {data.status}
          </Header>
        </div>
        <span className="list-item-description">
          {data.primarySkill}
        </span>
        <div className="list-item-extra">
          <span className="extra-left">
            {data.city}
          </span>
          <span className="extra-right">
            {data.lastChangeDate}
          </span>
        </div>
      </NavLink>
    </List.Item>
  );
};

CandidateListItem.defaultProps = {
  data: {}
};

CandidateListItem.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string
  })
};

export default CandidateListItem;
