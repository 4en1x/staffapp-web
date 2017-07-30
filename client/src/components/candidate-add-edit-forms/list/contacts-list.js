import React from "react";
import { Field } from "redux-form";
import { List, Input, Dropdown, Icon } from "semantic-ui-react";
import "./contacts-list.css";
import "./candidate.css";

const citiesList = [];

const emailInput = ({ input }) => {
  return (
    <Input
      {...input}
      placeholder="email address"
      label={{ basic: true, content: <Icon name="at" /> }}
      labelPosition="left"
    />
  );
};
const phoneInput = ({ input }) => {
  return (
    <Input
      {...input}
      placeholder="phone number"
      label={{ basic: true, content: <Icon name="phone" /> }}
      labelPosition="left"
    />
  );
};
const skypeInput = ({ input }) => {
  return (
    <Input
      {...input}
      placeholder="skype"
      label={{ basic: true, content: <Icon name="skype" /> }}
      labelPosition="left"
    />
  );
};
const linkedInInput = ({ input }) => {
  return (
    <Input
      {...input}
      placeholder="linkedIn"
      label={{ basic: true, content: <Icon name="linkedin" /> }}
      labelPosition="left"
    />
  );
};
const cityInput = ({ input }) => {
  return (
    <Dropdown
      placeholder="city"
      value={input.value}
      onChange={(param, data) => {
        input.onChange(data.value);
      }}
      search
      selection
      options={citiesList}
      labeled
      button
      className="icon"
      icon="university"
    />
  );
};

const ContactsList = props => {
  props.cities.map(step => {
    const temp = {
      key: step,
      text: step,
      value: step
    };
    citiesList.push(temp);
    return null;
  });
  return (
    <List className="contacts-list">
      <List.Item>
        <div className="item-with-label">
          city
          <Field name={"city"} component={cityInput} />
        </div>
      </List.Item>
      <List.Item>
        <div className="item-with-label">
          email adress<br />
          {!props.data && <Field name={"email"} component={emailInput} />}
          {props.data && <div className="email-font-size"> props.data.contacts.email</div>}
        </div>
      </List.Item>
      <List.Item>
        <div className="item-with-label">
          phone
          <Field name={"phone"} component={phoneInput} />
        </div>
      </List.Item>
      <List.Item>
        <div className="item-with-label">
          skype
          <Field name={"skype"} component={skypeInput} />
        </div>
      </List.Item>
      <List.Item>
        <div className="item-with-label">
          linkedIn
          <Field name={"linkedIn"} component={linkedInInput} />
        </div>
      </List.Item>
    </List>
  );
};

export default ContactsList;
