import React from 'react';
import { Label, Divider, Header, Card, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import CommunicationsList from './list/communications-list';
import ContactList from './list/contacts-list';
import SkillsList from './list/skills-list';
import './candidate.css';

const Candidate = props => {
  console.log(props.candidate);

  console.log(props.url);

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
          {props.candidate.status}
        </Label>
        <div className="candidate-header">
          <Header
            as="h1"
            content={`${props.candidate.name} ${props.candidate.surname}`}
          />
          <Header as="h3" content={``} disabled />
        </div>
        <Divider section />

        <div className="candidate-content">
          <SkillsList skills={props.candidate.skills} />
          <ContactList contacts={props.candidate.contacts} />
          <CommunicationsList communication={props.candidate.communication} />
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
        <Link className="button-container" to={`${props.url}/edit`}>
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
