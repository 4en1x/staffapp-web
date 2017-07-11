import React from "react";
import { List } from "semantic-ui-react";
import InterviewListItem from "./list-items/interview-list-item";
import VacancyListItem from './list-items/vacancy-list-item';
import "./list.css";

let VACANCY = {
  id: '1',
  name: 'Project',
  dateStart: '09.90.2017',
  primary_skill: 'primary_skill',
  status:'status',
  location: 'location'
};

export default class ListComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //const ListItem = this.props.listItem;

    return (
      <List className="list-component">
        {/*this.props.interviews.map(interview =>
          <InterviewListItem interview={interview} key={interview.id} />
          )*/
          <VacancyListItem vacancy={VACANCY} key={VACANCY.id} />
        }
      </List>
    );
  }
}
