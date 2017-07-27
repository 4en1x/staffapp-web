import React from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { store } from '../../index.js';
import changeActiveTab from './navigation-actions';
import './navigation.css';

export default class HRNavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: props.activeItem
    };
  }

  handleItemClick = (e, { name }) => {
    // if (name === this.state.activeItem) return;
    // store.dispatch(changeActiveTab(name));
    // this.setState({ activeItem: name });
  };

  navigationConfig = url => ({
    interview: {
      name: 'Interviews',
      url: `${url}interviews`
    },

    candidate: {
      name: 'Candidates',
      url: `${url}candidates`
    },

    vacancy: {
      name: 'Vacancies',
      url: `${url}vacancies`
    },

    history: {
      name: 'History',
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
            as={NavLink}
            to={`${config[element].url}`}
            key={config[element].name}
            name={config[element].name}
            activeClassName="active"
          />
        )}
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeTab: state.navigationBar.activeTab
  };
};
