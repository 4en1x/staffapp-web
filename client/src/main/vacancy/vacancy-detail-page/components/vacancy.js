import React from 'react';
import { Header, Label } from 'semantic-ui-react';
import InfoTab from './info/info-tab';
import CandidatesTab from './candidates/candidates-wrapper';
import SecondaryMenu from '../../../../components/secondary-menu/secondary-menu.component';

import './vacancy.css';

const Items = ['Info', 'Suitable candidates'];

export default class Vacancy extends React.Component {
  state = { activeItem: Items[0] };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const vacancy = this.props.vacancy;
    const url = this.props.url;
    vacancy.secondarySkills = vacancy.secondarySkills || [];

    let currentTab;

    switch (activeItem) {
      case Items[0]:
        currentTab = <InfoTab info={this.props} url={url}/>;
        break;
      case Items[1]:
        currentTab = <CandidatesTab url={url} />;
        break;
      default:
        currentTab = '';
    }
    const date = new Date(vacancy.createdDate);
    return (
      <div className="page-content">
        <div className="relative content-tab background padded">
          <Header as="h1" content={vacancy.name} />
          <Label
            className="custom"
            as="a"
            color="teal"
            ribbon="right"
            size="big"
            content={vacancy.status}
          />
          <div className="extra">
            <span className="span-label">
              {vacancy.city}
            </span>
            <span className="span-label">
              Created: {date.toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="content-wide">
          {currentTab}
        </div>
        <div className="content-thin">
          <SecondaryMenu items={Items} onItemClick={this.handleItemClick} />
        </div>
      </div>
    );
  }
}
