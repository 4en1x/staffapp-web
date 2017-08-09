import React from 'react';
import { List } from 'semantic-ui-react';
import './list.css';

export default class ListComponent extends React.Component {
  render() {
    const ListItem = this.props.listItem;
    const elements = this.props.elements;
    const url = this.props.url;
    console.log(elements);
    return (
      <List divided className="list-component">
        {elements.map(element => {
          return <ListItem key={`${element.id}`} element={element} url={url} />;
        })}
      </List>
    );
  }
}
