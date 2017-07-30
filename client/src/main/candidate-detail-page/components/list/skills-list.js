import React from "react";
import { List } from "semantic-ui-react";
import Collapsible from "react-collapsible";
import "./skills.css";

const SkillsList = props => {
  const skillsInfo = {
    id: "1",
    primarySkill: "JavaScript",
    skills: ["Java", "Ruby", "C/C++", "Python", "Objective-C", "Swift"],
    englishLevel: "upper-intermediate"
  };

  return (
    <List className="skills-list">
      <Collapsible className="collapse" trigger={skillsInfo.primarySkill}>
        {skillsInfo.skills.map(skill => {
          return (
            <List.Item key={skill.toString()}>
              {skill}
            </List.Item>
          );
        })}
      </Collapsible>
      <List.Item>
        {skillsInfo.englishLevel}
      </List.Item>
    </List>
  );
};

export default SkillsList;
