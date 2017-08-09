import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Button, Label, List, Menu, Grid } from 'semantic-ui-react';

import roles from '../../../../../config/config';

const InfoTab = props =>
  <div className="content-tab background padded">
    <Header as="h2">
      Primary skill:
      <Header.Subheader>{props.info.vacancy.primarySkill}</Header.Subheader>
    </Header>

    <Header as="h2">
      Secondary skill:
      {props.info.vacancy.secondarySkills.map(skill =>
        <Header.Subheader content={skill} />
      )}
    </Header>
    <Header as="h2">
      Description:
      <Header.Subheader>{props.info.vacancy.description}</Header.Subheader>
    </Header>
    <div className="buttons">
      <Link to={`${props.url}/edit`}>
        <Button className="vacancy-detail-page_edit-button">Edit</Button>
      </Link>
      {props.info.role === roles.ADMIN.ROLE
        ? <Button
            className="vacancy-detail-page_edit-button"
            onClick={props.info.onDeletedVacancy}
          >
            Delete
          </Button>
        : null}
    </div>
  </div>;
export default InfoTab;
