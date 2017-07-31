import React from 'react';
import { List, Header } from 'semantic-ui-react';

const SkillsList = props => {
  const skills = props.skills;

  return (
    <div className="candidate-lists">
      <Header disabled as="h2">
        Skills
      </Header>
      <List size="huge">
        <List.Item>
          <List.Header>
            {skills.primarySkill}
          </List.Header>
          <List.Description>
            {skills.primarySkillYearStart}
          </List.Description>
        </List.Item>
        <List.Item>
          <List bulleted items={skills.secondarySkills} />
        </List.Item>
        <List.Item>
          {skills.englishLevel}
        </List.Item>
      </List>
    </div>
  );
};

export default SkillsList;
