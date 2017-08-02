import React from 'react';
import { Link } from 'react-router-dom';
import { List, Table } from 'semantic-ui-react';

const HiringsTab = props =>
  <div className="tab-content">
    <List size="large">
      <List.Item>
        <Table>
          <Table.Header>
            <Table.HeaderCell>
              {props.hirings[0].vacancyName}
            </Table.HeaderCell>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Interview_1</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Interview_2</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Interview_3</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </List.Item>
      <Link to="/hiring/add">
        <Table>
          <Table.Header>
            <Table.HeaderCell>Add hiring</Table.HeaderCell>
          </Table.Header>
        </Table>
      </Link>
    </List>
  </div>;

export default HiringsTab;
