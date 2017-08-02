import React from 'react';
import { Table } from 'semantic-ui-react';

const HistoryTab = props => {
  const tableData = [
    { user: 'John', date: 15, description: 'Male' },
    { user: 'John', date: 15, description: 'Male' },
    { user: 'John', date: 15, description: 'Male' }
  ];
  return (
    <div className="tab-content">
      <Table size="large">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>User</Table.HeaderCell>
            <Table.HeaderCell>Changes</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tableData.map(({ date, user, description }) =>
            <Table.Row>
              <Table.Cell>
                {date}
              </Table.Cell>
              <Table.Cell>
                {user}
              </Table.Cell>
              <Table.Cell>
                {description}
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default HistoryTab;
