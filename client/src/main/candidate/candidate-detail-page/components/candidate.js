import React from 'react';
import { Link } from 'react-router-dom';
import {
  Label,
  Divider,
  Header,
  Card,
  Button,
  Tab,
  Menu,
  Segment,
  Grid
} from 'semantic-ui-react';
import InfoTab from './tabs/info-tab';
import VacanciesTab from './tabs/vacancies-tab';
import HistoryWrapper from './history-wrapper/history-wrapper';
import HiringWrapper from './hiring-wrapper/hiring-wrapper';
import VacancyWrapper from './vacancies-wrapper/vacancies-wrapper';
import './candidate.css';

const ItemsList = ['Info', 'Hirings', 'History', 'Vacancies'].map(item => ({
  key: item,
  name: item
}));

export default class Candidate extends React.Component {
  state = { activeItem: ItemsList[0].name };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;
    let currentTab;
    switch (activeItem) {
      case 'Info':
        currentTab = <InfoTab info={this.props.candidate.info} />;
        break;
      case 'Hirings':
        currentTab = <HiringWrapper url={this.props.url} />;
        break;
      case 'History':
        currentTab = <HistoryWrapper url={this.props.url}/>;
        break;
      case 'Vacancies':
        currentTab = <VacancyWrapper url={this.props.url} />;
        break;
      default:
        currentTab = '';
    }
    return (
      <div className="main-component">
        <Header dividing as="h2" className="custom-header" content="">
          Candidate
        </Header>
        <Card fluid>
          <Label
            as="a"
            color="blue"
            ribbon="right"
            size="big"
            className="custom-label"
          >
            {this.props.candidate.status}
          </Label>
          <div className="candidate-header">
            <Header as="h1">
              {this.props.candidate.name} {this.props.candidate.surname}
            </Header>
            <Header.Subheader
              as="h3"
              content={this.props.candidate.city}
              disabled
            />
          </div>
          <Divider />
          <Grid relaxed padded>
            <Grid.Column width={13}>
              {currentTab}
            </Grid.Column>

            <Grid.Column stretched width={3}>
              <Menu
                fluid
                vertical
                tabular="right"
                size="massive"
                onItemClick={this.handleItemClick}
                items={ItemsList}
                defaultActiveIndex={0}
              />
            </Grid.Column>
          </Grid>
        </Card>
      </div>
    );
  }
}
