import React from 'react';
import { Link } from 'react-router-dom';
import {
  Segment,
  Header,
  Button,
  Divider,
  Label,
  List,
  Icon,
  Accordion
} from 'semantic-ui-react';
import Collapsible from 'react-collapsible';
import './vacancy.css';

class InfoTab extends React.Component {
  render() {
    console.log('lalalala');

    const vacancy = this.props.vacancy;
    const url = this.props.url;

    return (
      <div className="vacancy-detail-page_content">
        <Header as="h2" className="vacancy-detail-page_skills-label">
          Skills
        </Header>
        <Header as="h3" className="vacancy-detail-page_primary-skill">
          {vacancy.primarySkill}
        </Header>

        <Accordion className='vacancy-detail-page_skills-list'>
          <Accordion.Title>
            <Icon name='dropdown' />
            skills
          </Accordion.Title>
          {vacancy.secondarySkills.map(skill => {
            return (
              <Accordion.Content key={skill}>
                {skill}
              </Accordion.Content>
            );
          })}
        </Accordion>
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
            {this.props.role === 'admin'
              ? <Button
                  primary
                  className="vacancy-detail-page_edit-button"
                  onClick={this.props.onDeleteButtonClicked}
                >
                  Delete
                </Button>
              : null}
          </div>
          <div className="vacancy-detail-page_create-date">
            Creating: {vacancy.createdDate}
          </div>
        </div>
      </div>
    );
  }
}

/*
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

 <Header as="h2" className="vacancy-detail-page_english-level-label">
 English level
 </Header>
 <Header as="h4" className="vacancy-detail-page_english-level-value">
 Intermidiate
 </Header>
 */

export default InfoTab;
