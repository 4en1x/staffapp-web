import React from 'react';
import { Header, List } from 'semantic-ui-react';

const CommunicationsList = props => {
  const communication = props.communication;

  return (
    <div className="candidate-lists">
      <Header disabled as="h2">
        Communications
      </Header>
      <List size="huge">
        <List.Item>
          {communication.hrName}
        </List.Item>
        <List.Item>
          {communication.salary}
        </List.Item>
        <List.Item href="#">
          {communication.resume}
        </List.Item>
        <List.Item>
          {communication.lastChangeDate}
        </List.Item>
      </List>
    </div>
  );
};

export default CommunicationsList;
