import React from 'react';
import { Header, Accordion, Icon } from 'semantic-ui-react';
import ListComponent from '../../../../components/list/list.component';
import FeedbcackListItem from '../../../../components/list/list-items/feedback-list-item';

const FeedbackItem = props =>
  <Accordion className="content-tab">
    <Accordion.Title>
      <Header dividing as="h3" className="custom-header">
        <Icon name="dropdown" />
        Feedback {props.feedback.id}
      </Header>
    </Accordion.Title>
    <Accordion.Content>
      <ListComponent
        listItem={FeedbcackListItem}
        elements={props.feedback.fields}
        url={`/`}
      />
    </Accordion.Content>
  </Accordion>;
export default FeedbackItem;
