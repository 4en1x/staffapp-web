import React from 'react';
import { List, Header } from 'semantic-ui-react';

const SkillsList = props => {
  const skills = props.skills;

  return (
    <div className="candidate-list">
      <Header disabled as="h3">
        Skills
      </Header>
      <List relaxed size="big">
        <List.Item>
          <List.Header>
            {skills.primarySkill}
          </List.Header>
          <List.Description>
            since {skills.primarySkillYearStart}
          </List.Description>
        </List.Item>
        <List.Item>
          <List.Header>secondary</List.Header>
          <List.Description>
            <List bulleted items={skills.secondarySkills} />{' '}
          </List.Description>
        </List.Item>
        <List.Item>
          <List.Header>english level</List.Header>
          <List.Description>
            {skills.englishLevel}
          </List.Description>
        </List.Item>
      </List>
    </div>
  );
};

export default SkillsList;
