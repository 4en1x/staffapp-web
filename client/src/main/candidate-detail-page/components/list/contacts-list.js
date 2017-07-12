import React from 'react';
import {List} from 'semantic-ui-react';

const ContactsList = props => {

  const contactInfo = {
    id: '1',
    email: 'smoiseyenko@gmail.com',
    phone_number: '1234567890',
    skype: 'sergey_moiseyenko',
    city: 'Minsk',
    linked_link: 'http://linked_in'
  };

  return (
    <List as="ul">
      <List.Item as='li'>{contactInfo.email}</List.Item>
      <List.Item as='li'>{contactInfo.phone_number}</List.Item>
      <List.Item as='li'>{contactInfo.skype}</List.Item>
      <List.Item as='li'>{contactInfo.city}</List.Item>
      <List.Item as='li'>{contactInfo.linked_link}</List.Item>
    </List>
  )
};

export default ContactsList;
