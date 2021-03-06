import React from "react";
import { Field } from "redux-form";
import { List, Input, Dropdown, Icon, Label } from "semantic-ui-react";
import "./contacts-list.css";
import "./candidate.css";

let citiesList = [];

const emailInput = ({ input, meta: { touched, error } }) => {
  return (
    <div className="field-with-warning">
      <Input
        {...input}
        placeholder="email address"
        label={{ basic: true, content: <Icon name="at" /> }}
        labelPosition="left"
      />
      {touched &&
        (error &&
          <div className="warning-block">
            <Label basic color="red" pointing>
                {error}
            </Label>
          </div>)}
    </div>
  );
};
const phoneInput = ({ input, meta: { touched, error } }) => {
    return (
        <div className="field-with-warning">
    <Input
      {...input}
      placeholder="phone number"
      label={{ basic: true, content: <Icon name="phone" /> }}
      labelPosition="left"
    />
            {touched &&
            (error &&
            <div className="warning-block">
                <Label basic color="red" pointing>
                    {error}
                </Label>
            </div>)}
        </div>
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

export default class ContactsList extends React.Component {
  constructor(props) {
    super(props);
    this.initialData();
  }

  initialData = () => {
     citiesList =[];
    this.props.cities.map(step => {
      const temp = {
        key: step,
        text: step,
        value: step
      };
      citiesList.push(temp);
      return null;
    });
  };

  render() {
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
            email adress *<br />
            {!this.props.data &&
              <Field name={"email"} component={emailInput} />}
            {this.props.data &&
              <div className="email-font-size">
                {this.props.data.info.contacts.email}
              </div>}
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
            <Field name={"linkedin"} component={linkedInInput} />
          </div>
        </List.Item>
      </List>
    );
  }
}
