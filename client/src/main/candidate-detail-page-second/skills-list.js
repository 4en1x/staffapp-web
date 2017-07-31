import React from "react";
import { List } from "semantic-ui-react";
import "./skills.css";
import "./candidate.css";

const SkillsList = props => {
  let secondarySkills = "";
  props.data.skills.secondarySkills.map(
    step => (secondarySkills = secondarySkills + step + " / ")
  );
  if (secondarySkills.length !== 0)
    secondarySkills = secondarySkills.slice(0, secondarySkills.length - 3);
  return (
    <List className="skills-list">
      <List.Item>
        <div className="item-with-label">
          secondary skill
          <div className="email-font-size">
              {secondarySkills}
          </div>
        </div>
      </List.Item>

      <List.Item>
        <div className="item-with-label">
          english label
          <div className="email-font-size">
            {props.data.skills.englishLevel}
          </div>
        </div>
      </List.Item>
    </List>
  );
};

export default SkillsList;
