import React from 'react';
import SkillList from '../lists/skills-list';
import ContactsList from '../lists/contacts-list';
import CommunicationsList from '../lists/communications-list';

const InfoTab = props =>
  <div className="tab-content row">
    <SkillList skills={props.info.skills} />
    <ContactsList contacts={props.info.contacts} />
    <CommunicationsList communication={props.info.communication} />
  </div>;

export default InfoTab;
