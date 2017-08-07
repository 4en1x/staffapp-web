import React from 'react';
import { Table, Label, Header } from 'semantic-ui-react';
import HistoryItem from './history-item';

class HistoryComponent extends React.Component {
  render() {
    return (
      <Table basic="very">
        <Table.Body>
          {this.props.history.map(item => <HistoryItem item={item} />)}
        </Table.Body>
      </Table>
    );
  }
}
export default HistoryComponent;
