import React from "react";
import { List } from "semantic-ui-react";
import Collapsible from "react-collapsible";

const SkillsList = props => {
  const skillsInfo = {
    id: "1",
    primary_skill: "JavaScript",
    skills: ["Java", "Ruby", "C/C++", "Python", "Objective-C", "Swift"],
    english_level: "upper-intermediate"
  };

  return (
    <List as="ul">
      <Collapsible trigger={skillsInfo.primary_skill}>
        {skillsInfo.skills.map(skill => {
          return (
            <List.Item key={skill.toString()}>
              {skill}
            </List.Item>
          );
        })}
      </Collapsible>
      <List.Item as="li">
        {skillsInfo.english_level}
      </List.Item>
    </List>
  );
};

export default SkillsList;
