import React from 'react';
import { Header, Label } from 'semantic-ui-react';
import InfoTab from './tabs/info-tab';
import HistoryWrapper from './history-wrapper/history-wrapper';
import HiringWrapper from './hiring-wrapper/hiring-wrapper';
import VacanciesWrapper from './vacancies-wrapper/vacancies-wrapper';
import SecondaryMenuComponent from '../../../../components/secondary-menu/secondary-menu.component';
import LinkIconButton from '../../../../components/custom-button/link-icon-button';
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
    console.log(this.props);
    const { activeItem } = this.state;
    let currentTab;
    switch (activeItem) {
      case Items[0]:
        currentTab = (
          <InfoTab
            info={this.props.candidate.info}
            role={this.props.role}
            url={this.props.url}
            onDeleteClicked={this.props.onDeleteClicked}
          />
        );
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

    const lastChangeDate = new Date(
      this.props.candidate.info.communication.lastChangeDate
    );
    return (
      <div className="page-content">
        <div className="relative content-tab background padded ">
          <Header
            as="h1"
            content={`${this.props.candidate.name} ${this.props.candidate
              .surname}`}
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

          <div className="extra">
            <span className="span-label">
              {this.props.candidate.city}
            </span>
            <span className="span-label">
              Last change: {lastChangeDate.toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="content-wide">
          {currentTab}
        </div>
        <div className="content-thin">
          <SecondaryMenuComponent
            onItemClick={this.handleItemClick}
            items={Items}
          />
        </div>
      </div>
    );
  }
}
