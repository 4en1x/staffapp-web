import React from 'react';
import { List, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const HistoryListItem = props => {
  const history = props.element;
  const date = new Date(history.date);
  return (
    <List.Item className="flex-list-item">
      <Link to="#">
        <div className="list-item-top">
          <Header as="h2" className="top-left">
            {history.role}
          </Header>
          <Header as="h2" className="top-right">
            {history.event}
          </Header>
        </div>
          <Header as="h3" content={history.logs} />
        <div className="list-item-extra">
          <Header as="h3" content={date.toLocaleDateString()} disabled />
          <Header as="h3" content={date.toLocaleTimeString()} disabled />
        </div>
      </Link>
    </List.Item>
  );
};

export default HistoryListItem;
