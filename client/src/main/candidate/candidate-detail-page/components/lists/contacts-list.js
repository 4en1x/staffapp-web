import React from 'react';
import { List, Header } from 'semantic-ui-react';

const ContactsList = props => {
  const contacts = props.contacts;

  return (
    <div className="candidate-info-list">
      <Header disabled as="h3">
        Contacts
      </Header>
      <List relaxed size="big">
        <List.Item>
          <List.Header>email</List.Header>
          <List.Description>
            {contacts.email}
          </List.Description>
        </List.Item>
        <List.Item>
          <List.Header>phone</List.Header>
          {contacts.phone}
        </List.Item>
        <List.Item>
          <List.Header>skype</List.Header>
          {contacts.skype}
        </List.Item>
        <List.Item href="#">
          <List.Header>linkedIn</List.Header>
          {contacts.linkedin}
        </List.Item>
      </List>
    </div>
  );
};

export default ContactsList;
