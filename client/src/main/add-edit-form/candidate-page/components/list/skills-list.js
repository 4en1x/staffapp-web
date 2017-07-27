import React from "react";
import { Field } from "redux-form";
import { List, Dropdown } from "semantic-ui-react";
import "./skills.css";
import "../candidate.css";

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
      {...input}
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
const englishLevel = ({ input }) => {
  return (
    <Dropdown
      placeholder="english level"
      {...input}
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
  );
};

const SkillsList = props => {
  props.minorSkills.map(step => {
    const temp = {
      key: step,
      text: step,
      value: step
    };
    skillsList.push(temp);
    return null;
  });

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
          english label
          <Field name={"englishLevel"} component={englishLevel} />
        </div>
      </List.Item>
    </List>
  );
};

export default SkillsList;
