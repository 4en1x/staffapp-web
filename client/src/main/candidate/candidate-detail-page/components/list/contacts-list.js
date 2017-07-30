import React from "react";
import { List } from "semantic-ui-react";
import "./contacts-list.css";

const ContactsList = props => {
  const contactInfo = {
    id: "1",
    email: "smoiseyenko@gmail.com",
    phoneNumber: "1234567890",
    skype: "sergey_moiseyenko",
    city: "Minsk",
    linkedIn: "http://linked_in"
  };

  return (
    <List className="contacts-list">
      <List.Item>
        {contactInfo.email}
      </List.Item>
      <List.Item>
        {contactInfo.phoneNumber}
      </List.Item>
      <List.Item>
        {contactInfo.skype}
      </List.Item>
      <List.Item>
        {contactInfo.city}
      </List.Item>
      <List.Item href="#">
        {contactInfo.linkedIn}
      </List.Item>
    </List>
  );
};

export default ContactsList;
