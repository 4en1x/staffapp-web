import React from "react";
import { List } from "semantic-ui-react";
import VacancyListItem from "../../../components/list/list-items/vacancy-list-item";
import "./list.css";

// const VACANCY = {
//   id: "1",
//   name: "Project",
//   dateStart: "09.90.2017",
//   primarySkill: "primarySkill",
//   status: "status",
//   location: "location"
// };

export default class ListComponent extends React.Component {
  render() {
    // const ListItem = this.props.listItem;
    const props = this.props;
    return (
      <List divided className="list-component">
        {props.vacancies.map(VACANCY =>
          <VacancyListItem vacancy={VACANCY} key={VACANCY.id} />
        )}
      </List>
    );
  }
}
