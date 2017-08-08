import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import './vacancy-menu.css';

export default class VacancyMenu extends Component {
  state = { activeItem: 'info' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu secondary vertical className='vacancy-menu'>
        <Menu.Item name='info' active={activeItem === 'info'} onClick={this.handleItemClick} />
        <Menu.Item name='candidates' active={activeItem === 'candidates'} onClick={this.handleItemClick} />
      </Menu>
    )
  }
}