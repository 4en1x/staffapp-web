import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./navigation.css";

export default class WorkerNavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: props.activeItem
    };
  }

  handleItemClick = (e, { name }) => {
    if (name === this.state.activeItem) return;
    this.setState({ activeItem: name });
  };

  navigationConfig = url => ({
    interview: {
      name: "Interview",
      url: `${url}interviews`
    }
  });

  render() {
    const { activeItem } = this.state;
    const config = this.navigationConfig(this.props.url);
    const keys = Object.keys(config);

    return (
      <Menu pointing secondary className="menu-component">
        {keys.map(element =>
          <Menu.Item
            as={Link}
            to={`${config[element].url}`}
            key={config[element].name}
            name={config[element].name}
            active={activeItem === config[element].name}
            onClick={this.handleItemClick}
          />
        )}
      </Menu>
    );
  }
}