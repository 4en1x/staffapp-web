import React from 'react';
import {List} from 'semantic-ui-react';
import './contacts-list.css';

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
    <List className='contacts-list'>
      <List.Item>{contactInfo.email}</List.Item>
      <List.Item>{contactInfo.phone_number}</List.Item>
      <List.Item>{contactInfo.skype}</List.Item>
      <List.Item>{contactInfo.city}</List.Item>
      <List.Item>{contactInfo.linked_link}</List.Item>
    </List>
  )
};

export default ContactsList;
