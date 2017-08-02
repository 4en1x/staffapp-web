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
import HiringsTab from './tabs/hirings-tab';
import HistoryTab from './tabs/history-tab';
import './candidate.css';

const ItemsList = ['Info', 'Hirings', 'History'].map(item => ({
  key: item,
  name: item
}));

export default class Candidate extends React.Component {
  state = { activeItem: ItemsList[0].name };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    console.log(this.props);
    const { activeItem } = this.state;
    let currentTab;
    switch (activeItem) {
      case 'Info':
        currentTab = <InfoTab info={this.props.candidate.info} />;
        break;
      case 'Hirings':
        currentTab = <HiringsTab hirings={this.props.candidate.hirings} />;
        break;
      case 'History':
        currentTab = <HistoryTab history={this.props.candidate.history} />;
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
            <Header.Subheader as="h3" content={this.props.candidate.city} disabled />
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
