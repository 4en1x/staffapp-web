import React from 'react';
import { Header } from 'semantic-ui-react';
import InfoTab from './tabs/info-tab';
import HistoryWrapper from './history-wrapper/history-wrapper';
import HiringWrapper from './hiring-wrapper/hiring-wrapper';
import VacancyWrapper from './vacancies-wrapper/vacancies-wrapper';
import SecondaryMenuComponent from '../../../../components/secondary-menu/secondary-menu.component';

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
        currentTab = <VacancyWrapper url={this.props.url} />;
        break;
      case Items[3]:
        currentTab = <HistoryWrapper url={this.props.url} />;
        break;
      default:
        currentTab = '';
    }
    return (
      <div className="page-content">
        <div className="info-tab ">
          <Header as="h1">
            {this.props.candidate.name} {this.props.candidate.surname}
          </Header>
          <Header
            as="h3"
            content={this.props.candidate.info.skills.primarySkill}
            disabled
          />
        </div>
        <div className="content-left">
          {currentTab}
        </div>
        <div className="content-right">
          <SecondaryMenuComponent
            onItemClick={this.handleItemClick}
            items={Items}
          />
        </div>
      </div>
    );
  }
}
