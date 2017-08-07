import React from 'react';
import { Header, Label } from 'semantic-ui-react';
import InfoTab from './tabs/info-tab';
import HistoryWrapper from './history-wrapper/history-wrapper';
import HiringWrapper from './hiring-wrapper/hiring-wrapper';
import VacanciesWrapper from './vacancies-wrapper/vacancies-wrapper';
import SecondaryMenuComponent from '../../../../components/secondary-menu/secondary-menu.component';
import LinkButton from '../../../../components/custom-button/link-button';
import Button from '../../../../components/custom-button/button';

import roles from '../../../../config/config';

import './candidate.css';

const Items = ['Info', 'Interviews', 'Suitable vacancies', 'History'];

export default class Candidate extends React.Component {
  state = { activeItem: Items[0] };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;
    let currentTab;
    switch (activeItem) {
      case Items[0]:
        currentTab = <InfoTab info={this.props.candidate.info} />;
        break;
      case Items[1]:
        currentTab = <HiringWrapper url={this.props.url} />;
        break;
      case Items[2]:
        currentTab = <VacanciesWrapper url={this.props.url} />;
        break;
      case Items[3]:
        currentTab = <HistoryWrapper url={this.props.url} />;
        break;
      default:
        currentTab = '';
    }
    return (
      <div className="page-content">
        <div className="relative content-tab background padded ">
          <Header
            as="h1"
            content={`${this.props.candidate.name} ${this.props.candidate
              .surname}`}
            subheader={this.props.candidate.info.skills.primarySkill}
          />
          <Label
            className="custom"
            as="a"
            color="teal"
            ribbon="right"
            size="big"
          >
            {this.props.candidate.status}
          </Label>
        </div>
        <div className="content-left">
          {currentTab}
        </div>
        <div className="content-right">
          <LinkButton
            to={`${this.props.url}/edit`}
            content="Edit"
            color="twitter"
            icon="edit"
          />
          {this.props.role === roles.ADMIN.ROLE
            ? <Button
                content="Delete"
                icon="trash outline"
                labelPosition="left"
                color="twitter"
                onClick={this.props.onDeleteClicked}
              />
            : null}
          <SecondaryMenuComponent
            onItemClick={this.handleItemClick}
            items={Items}
          />
        </div>
      </div>
    );
  }
}
