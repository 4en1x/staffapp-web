import React from "react";
import { List } from "semantic-ui-react";
import { NavLink } from 'react-router-dom';
import "./list.css";

export default class ListComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const ListItem = this.props.listItem;
    const elements = this.props.elements;
    const url = this.props.url;
    console.log(url);

    return (
      <List divided className="list-component">
        {elements.map(element => {
          return (
            <NavLink key={`${element.id}`} to={`${url}/${element.id}`}><ListItem element={element} /></NavLink>
          )
        })}
      </List>
    );
  }
}
