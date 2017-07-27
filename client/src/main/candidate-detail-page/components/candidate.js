import React from 'react';
import { Segment, Label, Divider, Header } from 'semantic-ui-react';
import CommunicationsList from './list/communications-list';
import Contacts from './list/contacts-list';
import SkillsList from './list/skills-list';
import './candidate.css';

const Candidate = props => {
  return (
    <div className="candidate-detail-page">
      <div className="content">
        <div className="content-top">
          <Header as="h2" className="name-label">
            Sergey Moiseyenko
          </Header>
          <Divider />
          <Header as="h3" className="position-label">
            Java Junior Developer
          </Header>
        </div>
        <Segment className="content-description" raised>
          <Label
            as="a"
            color="red"
            ribbon="right"
            size="huge"
            className="label"
          >
            Overview
          </Label>
          <div className="list-container">
            <div className="contacts">
              <Header as="h4">Contacts</Header>
              <Contacts />
            </div>
            <div className="skills">
              <Header as="h4">Skills</Header>
              <SkillsList />
            </div>
            <div className="communications">
              <Header as="h4">Communications</Header>
              <CommunicationsList />
            </div>
          </div>
        </Segment>
      </div>
    </div>
  );
};

export default Candidate;
