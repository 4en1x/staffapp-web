import React from 'react';
import {
  Segment,
  Header,
  Button,
  Label,
  List,
  Menu,
  Grid
} from 'semantic-ui-react';
import Collapsible from 'react-collapsible';
import { Link } from 'react-router-dom';
import roles from '../../../../config/config';
import  VacancyMenu from '../../../../components/menu/vacancy-menu';
import SecondaryMenu from '../../../../components/secondary-menu/secondary-menu.component';
import './vacancy.css';

const items = ['info', 'candidates'];

class Vacancy extends React.Component {
  state = { activeItem: 'bio' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const vacancy = this.props.vacancy;
    const url = this.props.url;
    vacancy.secondarySkills = vacancy.secondarySkills || [];


    {/*let currentTab;*/}
    {/*switch (activeItem) {*/}
      {/*case Items[0]:*/}
        {/*currentTab = <InfoTab info={this.props.candidate.info} />;*/}
        {/*break;*/}
      {/*case Items[1]:*/}
        {/*currentTab = <HiringWrapper url={this.props.url} />;*/}
    //     break;
    //   case Items[2]:
    //     currentTab = <VacancyWrapper url={this.props.url} />;
    //     break;
    //   default:
    //     currentTab = '';
    // }

    return (
      <div className="page-content">
          <div className="relative content-tab background padded">
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
                Creating: {vacancy.createdDate}
              </div>
            </div>
          </div>
        <div className="content-left background padded">
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
              <Header
                as="h2"
                className="vacancy-detail-page_english-level-label"
              >
                English level
              </Header>
              <Header
                as="h4"
                className="vacancy-detail-page_english-level-value"
              >
                Intermidiate
              </Header>
              <div className="vacancy-detail-page_content-description">
                <Header
                  as="h2"
                  className="vacancy-detail-page_description-label"
                >
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
                {this.props.role === roles.ADMIN.ROLE
                  ? <Button
                      primary
                      className="vacancy-detail-page_edit-button"
                      onClick={this.props.onDeletedVacancy}
                    >
                      Delete
                    </Button>
                  : null}
              </div>
        </div>
        <div className="content-right">
          <SecondaryMenu
            items={items}
            onItemClick={this.handleItemClick}
          />
        </div>
      </div>
    );
  }
}

export default Vacancy;
