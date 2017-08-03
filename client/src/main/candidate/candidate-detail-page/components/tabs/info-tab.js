import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import SkillList from '../lists/skills-list';
import ContactsList from '../lists/contacts-list';
import CommunicationsList from '../lists/communications-list';

const InfoTab = props =>
  <div className="tab-content row">
    <SkillList skills={props.info.skills} />
    <ContactsList contacts={props.info.contacts} />
    <CommunicationsList communication={props.info.communication} />
    <Link to="/" className=".right">
      <Button
        className="add-button"
        fluid
        content="Edit"
        icon="edit"
        labelPosition="left"
        color="twitter"
      />
    </Link>
  </div>;

export default InfoTab;
