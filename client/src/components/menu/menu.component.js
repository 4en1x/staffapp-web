import React from "react";
import { Menu } from "semantic-ui-react";
import "./menu.component.css";


export default class MenuComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: this.props.items[0]
    };
  }

  handleItemClick = (e, { name }) => {
    if (name === this.state.activeItem) return;
    this.setState({ activeItem: name });
    this.props.menuItemClickHandle(name);
  };

  render() {
    const { activeItem } = this.state;
    const items = this.props.items;

    return (
      <Menu pointing secondary className="menu-component">
        {items.map(item =>
          <Menu.Item
            key={item.toString()}
            name={item}
            active={activeItem === item}
            onClick={this.handleItemClick}
          />
        )}
      </Menu>
    );
  }
}
