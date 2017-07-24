import React from "react";
import { Menu } from "semantic-ui-react";
import "./secondary-menu.css";

const ItemsList = ["my interviews", "assigments", "all"].map(item => ({
  key: item,
  name: item
}));

export default class SecondaryMenuComponent extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    // const ItemsList = this.props.itemsList.map(item => {
    //   return { key: item, name: item };
    // });

    return (
      <Menu
        secondary
        vertical
        className="custom"
        onItemClick={this.handleItemClick}
        items={ItemsList}
        defaultActiveIndex={0}
      />
    );
  }
}
