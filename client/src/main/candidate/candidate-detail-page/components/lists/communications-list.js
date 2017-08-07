import React from 'react';
import { Header, List } from 'semantic-ui-react';

const CommunicationsList = props => {
  const communication = props.communication;

  return (
    <div className="candidate-info-list">
      <Header disabled as="h3">
        Communications
      </Header>
      <List relaxed size="big">
        <List.Item>
          <List.Header>current HR</List.Header>
          <List.Description>
            {communication.hrName}
          </List.Description>
        </List.Item>
        <List.Item>
          <List.Header>salary</List.Header>
          <List.Description>
            {communication.salary}
          </List.Description>
        </List.Item>
        <List.Item>
          <List.Header>resume link</List.Header>
          <List.Description>
            {communication.resume}
          </List.Description>
        </List.Item>
        <List.Item>
          <List.Header>change date</List.Header>
          <List.Description>
            {communication.lastChangeDate}
          </List.Description>
        </List.Item>
      </List>
    </div>
  );
};

export default CommunicationsList;
