import React from 'react';
import { Link } from 'react-router-dom';
import { List, Table } from 'semantic-ui-react';

const HiringsTab = props =>
  <div className="info-tab">
    <Link to="/hiring/add">
      <Table>
        <Table.Header>
          <Table.HeaderCell>Add hiring</Table.HeaderCell>
        </Table.Header>
      </Table>
    </Link>
  </div>;

export default HiringsTab;
