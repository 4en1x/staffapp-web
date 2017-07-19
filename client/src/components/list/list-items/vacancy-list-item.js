import React from "react";
import { List } from "semantic-ui-react";
import { Divider } from "semantic-ui-react";
import "./vacancy-list-item.css";

const VacancyListItem = props => {
  const vacancy = props.element;

  return (
    <List.Item className="flex-vacancy-list-item">
      <div className="item">
        <div className="vacancy-list-item-header">
          <div className="name">
            {vacancy.name}
          </div>
          <div className="time">
            {vacancy.status}
          </div>
        </div>
        <div className="vacancy-list-item-description">
          <div className="description">
            {vacancy.primarySkill}
          </div>
        </div>
        <div className="vacancy-list-item-extra">
          <div className="location">
            {vacancy.location}
          </div>
          <div className="date">
            {vacancy.dateStart}
          </div>
        </div>
        <Divider />
      </div>
    </List.Item>
  );
};

export default VacancyListItem;
