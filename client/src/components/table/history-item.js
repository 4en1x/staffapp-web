import React from 'react';
import { Header, Label, Table, Statistic } from 'semantic-ui-react';

class HistoryItem extends React.Component {
  getColor = event => {
    switch (event) {
      case 'create':
        return 'green';
      case 'update':
        return 'purple';
      case 'delete':
        return 'red';
      default:
        return 'grey';
    }
  };

  render() {
    const item = this.props.item;
    return (
      <Table.Row>
        <Table.Cell>
          <Label
            horizontal
            color={this.getColor(item.event)}
            content={item.event}
          />
        </Table.Cell>
        <Table.Cell>
          <Header as="h3" content={item.logs} />
        </Table.Cell>
        <Table.Cell>
          <Label tag content={item.role} />
        </Table.Cell>
        <Table.Cell>
          <Statistic size="mini" value={item.time} label={item.date} />
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default HistoryItem;
