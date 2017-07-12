import React from "react";
import CommunicationsList from "./components/list/communications-list";
import Contacts from "./components/list/contacts-list";
import SkillsList from "./components/list/skills-list";
import { Segment } from "semantic-ui-react";
import { Label } from "semantic-ui-react";
import { Divider } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import HeaderComponent from "../../components/header/header.components";
import "./candidate-page.css";

let user = { name: "Sergey", surname: "Moiseyenko" };

export default class CandidatePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="candidate-detail-page">
        <HeaderComponent user={user} />
        <div className="content">
          <div className="user-info">
            <Header as="h2" className="name-label">
              Sergey Moiseyenko
            </Header>
            <Divider />
            <Header as="h3" className="position-label">
              Java Junior Developer
            </Header>
          </div>
          <Segment className="segment" raised>
            <Label
              as="a"
              color="red"
              ribbon="right"
              size="huge"
              className="label"
            >
              Overview
            </Label>
            <div className="lists-content">
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
  }
}
