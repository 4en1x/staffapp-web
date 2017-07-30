import React from 'react';
import { Segment, Label, Divider, Header } from 'semantic-ui-react';
import CommunicationsList from './list/communications-list';
import Contacts from './list/contacts-list';
import SkillsList from './list/skills-list';
import { Accordion, Icon } from 'semantic-ui-react';
import ListComponent from '../../../../components/list/list.component';
import InterviewListItem from '../../../../components/list/list-items/interview-list-item';
import './candidate.css';

const Candidate = props => {
  console.log(props);

  return (
    <div className="candidate-detail-page">
      <Header as="h2" className="name-label">
        Sergey Moiseyenko
      </Header>
      <Divider />
      <Header as="h3" className="position-label">
        Java Junior Developer
      </Header>
      <div className="candidate-detail-page_content">
        <Segment className="candidate-detail-page_candidate-card">
          <Label
            as="a"
            color="red"
            ribbon="right"
            size="huge"
            className="label candidate-detail-page_overview-label"
          >
            Overview
          </Label>
          <div className="candidate-detail-page_lists">
            <div className="candidate-detail-page_contacts-list">
              <Header as="h2">Contacts</Header>
              <Contacts />
            </div>
            <div className="candidate-detail-page_communications-list">
              <Header as="h2">Communications</Header>
              <CommunicationsList />
            </div>
            <div className="candidate-detail-page_skills-list">
              <Header as="h2">Skills</Header>
              <SkillsList />
            </div>
          </div>
        </Segment>
        <Segment className="candidate-detail-page_hiring-list">
          <Label
            as="a"
            color="red"
            ribbon="right"
            size="huge"
            className="label candidate-detail-page_hiring-label"
          >
            Hiring
          </Label>

          <div className="candidate-detail-page_accordion">
            {props.candidate.hirings.map(hiring =>
              <Accordion>
                <Accordion.Title>{hiring.id}</Accordion.Title>
                <Accordion.Content>
                  <ListComponent
                    listItem={InterviewListItem}
                    elements={props.candidate.hirings[0].interviews}
                    url={`/interviews`}
                    styles={{ width: '100%' }}
                  />
                </Accordion.Content>
              </Accordion>
            )}
          </div>
        </Segment>
      </div>
    </div>
  );
};

export default Candidate;

/*
 <div className="content-top">
 <Header as="h2" className="name-label">
 Sergey Moiseyenko
 </Header>
 <Divider />
 <Header as="h3" className="position-label">
 Java Junior Developer
 </Header>
 </div>
 <div className="content">
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
 <Header as="h2">Contacts</Header>
 <Contacts />
 </div>
 <div className="skills">
 <Header as="h2">Skills</Header>
 <SkillsList />
 </div>
 <div className="communications">
 <Header as="h2">Communications</Header>
 <CommunicationsList />
 </div>
 </div>
 </Segment>
 <Segment className="hiring-list" raised>
 <Label
 as="a"
 color="red"
 ribbon="right"
 size="huge"
 className="label"
 >
 Hiring
 </Label>
 </Segment>
 </div>
 </div>
 */
