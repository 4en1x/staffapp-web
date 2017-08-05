import React from 'react';
import {
  Segment,
  Header,
  Button,
  Divider,
  Label,
  List
} from 'semantic-ui-react';
import Collapsible from 'react-collapsible';
import { Link } from 'react-router-dom';
import './vacancy.css';

const Vacancy = props => {
  const vacancy = props.vacancy;
  const url = props.url;
  vacancy.secondarySkills = vacancy.secondarySkills || [];

  return (
    <div className="vacancy-detail-page">
      <Segment className="vacancy-detail-page_content">
        <div className="vacancy-detail-page_content-top">
          <div className="vacancy-detail-page_header">
            <Header as="h1" className="vacancy-detail-page_project-name">
              {vacancy.name}
            </Header>
            <Header as="h4" className="vacancy-detail-page_city">
              {vacancy.city}
            </Header>
          </div>
          <div className="vacancy-detail-page_deadline-date-status-label">
            <div>
              <Label as="a" color="orange" ribbon="right">
                {vacancy.status}
              </Label>
            </div>
            <div className="vacancy-detail-page_deadline-date">
              Deadline:{vacancy.jobStart}
            </div>
          </div>
        </div>
        <Divider />
        <Header as="h2" className="vacancy-detail-page_skills-label">
          Skills
        </Header>
        <Header as="h3" className="vacancy-detail-page_primary-skill">
          {vacancy.primarySkill}
        </Header>
        <Collapsible
          className="collapse vacancy-detail-page_skills-list"
          trigger="skills"
        >
          {vacancy.secondarySkills.map(skill => {
            return (
              <List.Item key={skill}>
                {skill}
              </List.Item>
            );
          })}
        </Collapsible>
        <Header as="h2" className="vacancy-detail-page_english-level-label">
          English level
        </Header>
        <Header as="h4" className="vacancy-detail-page_english-level-value">
          Intermidiate
        </Header>
        <div className="vacancy-detail-page_content-description">
          <Header as="h2" className="vacancy-detail-page_description-label">
            Description
          </Header>
          <div className="vacancy-detail-page_description">
            {vacancy.description}
          </div>
        </div>
        <div className="vacancy-detail-page_content-bottom">
          <div className="vacancy-detail-page_edit-btn-change-date">
            <Link to={`${url}/edit`}>
            <Button primary className="vacancy-detail-page_edit-button">
              Edit
            </Button>
            </Link>
          </div>
          <div className="vacancy-detail-page_create-date">
            Creating: {vacancy.createdDate}
          </div>
        </div>
      </Segment>
    </div>
  );
};

export default Vacancy;
