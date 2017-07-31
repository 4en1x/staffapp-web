import React from 'react';
import { List, Header } from 'semantic-ui-react';

const ContactsList = props => {
  const contacts = props.contacts;

  return (
    <div className="candidate-lists">
      <Header disabled as="h2">
        Contacts
      </Header>
      <List size="big" relaxed>
        <List.Item>
          <List.Icon name="folder" verticalAlign="middle" />
          <List.Content>
            <List.Header>email</List.Header>
            <List.Description>
              {contacts.email}
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          {contacts.city}
        </List.Item>
        <List.Item>
          {contacts.phone}
        </List.Item>
        <List.Item>
          {contacts.skype}
        </List.Item>
        <List.Item href="#">
          {contacts.linkedIn}
        </List.Item>
        {contacts.links.map(link =>
          <List.Item href="#">
            {link}
          </List.Item>
        )}
      </List>
    </div>
  );
};

export default ContactsList;
