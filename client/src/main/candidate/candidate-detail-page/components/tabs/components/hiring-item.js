import React from 'react';
import { Header, Accordion, Icon } from 'semantic-ui-react';
import ListComponent from '../../../../../../components/list/list.component';
import CandidateInterviewListItem from '../../../../../../components/list/list-items/candidate-interview-list-item';

const HiringItem = props =>
  <Accordion className="content-tab">
    <Accordion.Title>
      <Header dividing as="h3" className="custom-header">
        <Icon name="dropdown" />
        {props.hiring.vacancyName}
      </Header>
    </Accordion.Title>
    <Accordion.Content>
      <ListComponent
        listItem={CandidateInterviewListItem}
        elements={props.hiring.interviews}
        url={`/interviews`}
      />
    </Accordion.Content>
  </Accordion>
export default HiringItem;
