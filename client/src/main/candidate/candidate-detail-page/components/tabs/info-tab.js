import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import SkillList from '../lists/skills-list';
import ContactsList from '../lists/contacts-list';
import CommunicationsList from '../lists/communications-list';
import roles from '../../../../../config/config';

const InfoTab = props =>
  <div className="content-tab background padded">
    <div className="content-tab row">
      <SkillList skills={props.info.skills} />
      <ContactsList contacts={props.info.contacts} />
      <CommunicationsList communication={props.info.communication} />
    </div>
    <div className="buttons">
      <Link to={`${props.url}/edit`}>
        <Button icon="edit" labelPosition="left" content="Edit" />
      </Link>
      {props.role === roles.ADMIN.ROLE
        ? <Button
            content="Delete"
            icon="trash outline"
            labelPosition="left"
            onClick={props.onDeleteClicked}
          />
        : null}
    </div>
  </div>;
export default InfoTab;
