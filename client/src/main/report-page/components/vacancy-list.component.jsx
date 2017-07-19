import React from "react";
import { List } from "semantic-ui-react";
import VacancyListItem from "../../../components/list/list-items/vacancy-list-item";
import "./list.css";

export default class ListComponent extends React.Component {
  render() {
    // const ListItem = this.props.listItem;
    const props = this.props;
    return (
      <List divided className="report-list-component">
        {props.vacancies.map(VACANCY =>
          <VacancyListItem vacancy={VACANCY} key={VACANCY.id} />
        )}
      </List>
    );
  }
}
