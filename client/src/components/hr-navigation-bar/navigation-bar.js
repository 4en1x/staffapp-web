import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./navigation.css";

export default class HRNavigationBar extends React.Component {
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

  //config for navigation bar (navigation bar give you more flex and you just config navi bar)

  navigationConfig = url => ({
    interview: {
      name: "Interviews",
      url: `${url}interviews`
    },

    candidate: {
      name: "Candidates",
      url: `${url}candidates`
    },

    vacancy: {
      name: "Vacancies",
      url: `${url}vacancies`
    },

    history: {
      name: "History",
      url: `${url}history`
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
