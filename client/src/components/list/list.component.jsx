import React from "react";
import { List } from "semantic-ui-react";
import "./list.css";


export default class ListComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const ListItem = this.props.listItem;
    const elements = this.props.elements;
    console.log(elements);
    console.log(ListItem);

    return (
      <List divided className="list-component">
        {elements.map(element => {
          return <ListItem element={element} key={element.id}/>
        })}
      </List>
    );
  }
}
