import React from 'react';
import { Table, Accordion } from 'semantic-ui-react';

import InterviewItem from './interview-item';

const HiringItem = props =>
  <div>
    <Accordion.Title>
      {props.hiring.vacancyName}
    </Accordion.Title>
    <Accordion.Content>
      <Table basic="very">
        <Table.Body>
          {props.hiring.interviews.map(item => <InterviewItem item={item} />)}
        </Table.Body>
      </Table>
    </Accordion.Content>
  </div>;

export default HiringItem;
