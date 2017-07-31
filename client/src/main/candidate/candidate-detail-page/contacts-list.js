import React from "react";
import { List } from "semantic-ui-react";
import "./contacts-list.css";
import "./candidate.css";


const ContactsList = props => {
  return (
    <List className="contacts-list">
      <List.Item>
        <div className="item-with-label">
          city
            <div className="email-font-size"> {props.data.contacts.city}</div>
        </div>
      </List.Item>
      <List.Item>
        <div className="item-with-label">
          email adress<br />
          <div className="email-font-size"> {props.data.contacts.email}</div>
        </div>
      </List.Item>
      <List.Item>
        <div className="item-with-label">
          phone
            <div className="email-font-size"> {props.data.contacts.phone}</div>
        </div>
      </List.Item>
      <List.Item>
        <div className="item-with-label">
          skype
            <div className="email-font-size"> {props.data.contacts.skype}</div>
        </div>
      </List.Item>
      <List.Item>
        <div className="item-with-label">
          linkedIn
            <div className="email-font-size"> {props.data.contacts.linkedin}</div>
        </div>
      </List.Item>
    </List>
  );
};

export default ContactsList;
