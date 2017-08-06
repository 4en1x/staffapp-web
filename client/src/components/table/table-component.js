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

/*let structData, preview;
 if (item.logs.indexOf('data: {') !== -1) {
 structData = item.logs.slice(65, item.logs.length - 2);
 structData = structData.replace(/\"/gi, ' ');
 preview = item.logs.slice(0, 64);
 }*/
