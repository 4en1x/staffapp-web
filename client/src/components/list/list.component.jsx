import React from "react";
import { List } from "semantic-ui-react";
import InterviewListItem from "../../components/list/list-items/interview-list-item.jsx"
import "./list.css";

export default class ListComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const ListItem = this.props.listItem;
    const elements = this.props.elements;
    const url = this.props.url;

    return (
      <List divided className="list-component">
        {elements.map(element => {
          return (
            <InterviewListItem key={`${element.id}`} element={element} url={url}/>
          )
        })}
      </List>
    );
  }
}
