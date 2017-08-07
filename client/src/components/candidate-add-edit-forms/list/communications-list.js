import React from "react";
import { Field } from "redux-form";
import { List, Input, Icon } from "semantic-ui-react";
import "./communications-list.css";
import "./candidate.css";

const resumeInput = ({ input }) => {
  return <Input {...input} placeholder="resume" />;
};
const salaryInput = ({ input }) => {
  return (
    <Input
      {...input}
      type="number"
      placeholder="salary"
      label={{ basic: true, content: <Icon name="dollar" /> }}
      labelPosition="left"
    />
  );
};

const CommunicationsList = props => {
  return (
    <List className="communications-list">
      <List.Item />
      <List.Item>
        <div className="item-with-label">
          resume
          <Field name={"resume"} component={resumeInput} />
        </div>
      </List.Item>
      <List.Item>
        <div className="item-with-label">
          salary
          <Field name={"salary"} component={salaryInput} />
        </div>
      </List.Item>
    </List>
  );
};

export default CommunicationsList;