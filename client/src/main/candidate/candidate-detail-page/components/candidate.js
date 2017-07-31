import React from 'react';
import { Label, Divider, Header, Card, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import CommunicationsList from './list/communications-list';
import ContactList from './list/contacts-list';
import SkillsList from './list/skills-list';
import './candidate.css';

const Candidate = props => {
  const Skills = {
    id: '1',
    primarySkill: 'JavaScript',
    otherSkills: ['Java', 'Ruby', 'C/C++', 'Python', 'Objective-C', 'Swift'],
    englishLevel: 'upper-intermediate'
  };
  return (
    <div className="main-component">
      <Header dividing as="h2" className="custom-header" content="">
        Candidate info
      </Header>
      <Card fluid>
        <Label
          as="a"
          color="blue"
          ribbon="right"
          size="big"
          className="custom-label"
        >
          Status
        </Label>
        <div className="candidate-header">
          <Header as="h1" content="Sergey Moiseyenko" />
          <Header as="h3" content="City, Country" disabled />
        </div>
        <Divider section />

        <div className="candidate-content">
          <SkillsList />
          <ContactList />
          <CommunicationsList />
        </div>
        <Link className="button-container" to="/">
          <Button
              content="Add hiring"
              icon="add"
              labelPosition="left"
              color="twitter"
              floated="right"
          />
        </Link>
        <Link className="button-container" to="/">
          <Button
            content="Edit"
            icon="edit"
            labelPosition="left"
            color="twitter"
            floated="right"
          />
        </Link>
      </Card>
    </div>
  );
};

export default Candidate;
