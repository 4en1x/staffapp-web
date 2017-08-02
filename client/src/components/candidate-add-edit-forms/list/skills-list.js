import React from "react";
import { Field } from "redux-form";
import { List, Dropdown, Label } from "semantic-ui-react";
import "./skills-list.css";
import "./candidate.css";

const skillsList = [];
const englishLevelsList = [
  { key: "A0", text: "Beginner (A0)", value: "A0" },
  { key: "A1", text: "Elementary (A1)", value: "A1" },
  { key: "A2", text: "Pre-Intermediate (A2)", value: "A2" },
  { key: "B1", text: "Intermediate (B1)", value: "B1" },
  { key: "B2", text: "Upper-Intermediate (B2)", value: "B2" },
  { key: "C1", text: "Advanced (C1)", value: "C1" },
  { key: "C2", text: "Proficiency (C2)", value: "C2" }
];

const secondarySkills = ({ input }) => {
  return (
    <Dropdown
      selection
      value={input.value}
      onChange={(param, data) => {
        input.onChange(data.value);
      }}
      placeholder="minor skills"
      fluid
      multiple
      search
      options={skillsList}
      labeled
      button
      className="icon"
      icon="lightning"
    />
  );
};
const englishLevel = ({ input, meta: { touched, error } }) => {
    return (
        <div className="field-with-warning">
    <Dropdown
      placeholder="english level"
      value={input.value}
      onChange={(param, data) => {
        input.onChange(data.value);
      }}
      search
      selection
      options={englishLevelsList}
      labeled
      button
      className="icon"
      icon="graduation"
    />
            {touched &&
            (error &&
            <div className="warning-block">
              <Label basic color="red" pointing>
                Please enter english level
              </Label>
            </div>)}
        </div>
    );
};

export default class SkillsListextends extends React.Component {
  constructor(props) {
    super(props);
    this.initialData();
  }

  initialData = () => {
    this.props.minorSkills.map(step => {
      const temp = {
        key: step,
        text: step,
        value: step
      };
      skillsList.push(temp);
      return null;
    });
  };

  render() {
    return (
      <List className="skills-list">
        <List.Item>
          <div className="item-with-label">
            secondary skills
            <Field name={"secondarySkills"} component={secondarySkills} />
          </div>
        </List.Item>

        <List.Item>
          <div className="item-with-label">
            english level *
            <Field name={"englishLevel"} component={englishLevel} />
          </div>
        </List.Item>
      </List>
    );
  }
}
