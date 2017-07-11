import React from "react";
import { List } from "semantic-ui-react";
import InterviewListItem from "./list-items/interview-list-item";
import "./list.css";

export default class ListComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //const ListItem = this.props.listItem;

    return (
      <List className="list-component">
        {this.props.interviews.map(interview =>
          <InterviewListItem interview={interview} key={interview.id} />
        )}
      </List>
    );
  }
}
