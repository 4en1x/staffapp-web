import React from 'react';
import {Table} from 'semantic-ui-react';

const InterviewItem = props =>
  <Table.Row>
    <Table.Cell>
      {props.item.date}
    </Table.Cell>
    <Table.Cell>
      {props.item.type}
    </Table.Cell>
    <Table.Cell>
      {props.item.place}
    </Table.Cell>
    <Table.Cell>
      {props.item.time}
    </Table.Cell>
  </Table.Row>;

export default InterviewItem;
