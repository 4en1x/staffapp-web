import React from 'react';
import PropTypes from 'prop-types';
import { Image, Dropdown, Icon } from 'semantic-ui-react';
import images from '../../assets/images';
import './header.css';

const trigger = (
  <span>
    <Icon name="user" /> Hello, Bob
  </span>
);

const options = [
  { value: 'notifications', text: 'Notifications' },
  { value: 'sign-out', text: 'Sign Out' }
];

const DropDownTrigger = (props) =>
  <Dropdown trigger={trigger} options={options} onChange={props.itemSelected} />;

export default class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const user = this.props.user;

    return (
      <div className="header-component">
        <Image className="image" src={images.logo1} />
        <DropDownTrigger user={user} itemSelected={this.props.itemSelected}/>
      </div>
    );
  }
}
HeaderComponent.defaultProps = {
  user: {}
};

HeaderComponent.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    surname: PropTypes.string
  })
};
