import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import SkillList from '../lists/skills-list';
import ContactsList from '../lists/contacts-list';
import CommunicationsList from '../lists/communications-list';

const InfoTab = props =>
  <div>
    <div className="content-tab row">
      <SkillList skills={props.info.skills} />
      <ContactsList contacts={props.info.contacts} />
      <CommunicationsList communication={props.info.communication} />
    </div>
    <div className="right">
      <Link to="/">
        <Button
          className="add-button"
          content="Edit"
          icon="edit"
          labelPosition="left"
          color="twitter"
        />
      </Link>
      <Link to="/">
        <Button
          className="add-button"
          content="Delete"
          icon="trash outline"
          labelPosition="left"
          color="twitter"
        />
      </Link>
    </div>
  </div>;

export default InfoTab;
