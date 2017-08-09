import React from 'react';
import { List, Header } from 'semantic-ui-react';

const FeedbackListItem = props => {
  const field = props.element;
  console.log(field);
  return (
    <List.Item className="flex-list-item">
      <a>
        <div className="list-item-top">
          <Header as="h2" className="top-left">
            {field.typeSkill}
          </Header>
          <Header as="h2" className="top-right">
            {`by ${field.type.toLowerCase()}`}
          </Header>
        </div>
        <Header as="h3" content={`${field.name}: ${field.value}/5`} />
        <div className="list-item-extra">
          <Header as="h4" content={field.comment} disabled />
        </div>
      </a>
    </List.Item>
  );
};

export default FeedbackListItem;
