import React from "react";
import { List } from "semantic-ui-react";
import CandidateListItem from "../../../components/list/list-items/candidate-list-item";
import "./list.css";

export default class ListComponent extends React.Component {
  render() {
    // const ListItem = this.props.listItem;
    const props = this.props;
    return (
      <List divided className="list-component">
        {props.candidates.map(candidate =>
          <CandidateListItem data={candidate} key={candidate.id} />
        )}
      </List>
    );
  }
}
