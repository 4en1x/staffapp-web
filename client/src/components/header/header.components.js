import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Image, Dropdown, Icon } from 'semantic-ui-react';
import HRNavigationBar from '../../components/hr-navigation-bar/navigation-bar';
import WorkerNavigation from '../../components/worker-navigation-bar/navigation-bar';
import Notification from '../notification/notification';
import images from '../../assets/images';
import notificationService from '../../service/notification-service';
import './header.css';

const trigger = name =>
  <span>
    <Icon name="user" /> {name}
  </span>;

const options = [
  { value: 'notifications', text: 'Notifications' },
  { value: 'sign-out', text: 'Sign Out' }
];

class DropDownTrigger extends React.Component {
  logoutAndNotification = (event, value) => {
    if (value.value === 'sign-out') this.props.itemSelected(event, value);
    if (value.value === 'notifications')
      document.getElementById('notification-label').style.display = 'block';
  };

  render() {
    return (
      <Dropdown
        trigger={trigger(this.props.user.name)}
        onChange={this.logoutAndNotification}
        options={options}
      />
    );
  }
}

export default class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: []
    };
  }

  config = () => ({
    admin: <HRNavigationBar />,
    hr: <HRNavigationBar />,
    user: <WorkerNavigation />
  });

  componentDidMount() {
    notificationService.getMessageList().then(res => {
      this.setState({ list: res.data });
    });
  }

  deleteMessage = id => {
    const list = this.state.list.slice();
    list.forEach((item, move) => {
      if (item.id === id) list.splice(move, 1);
    });

    notificationService.patchNotification(id);

    this.setState({ list });
  };

  render() {
    const config = this.config();
    const user = this.props.user;
    return (
      <div className="header-component">
        <div className="header-content">
          <div className="header-content-left">
            <Link to="/" className="logo-container">
              <Image className="logo" src={images.logo1} />
            </Link>
            {config[user.role]}
          </div>
          <DropDownTrigger user={user} itemSelected={this.props.itemSelected} />
          <Notification
            messages={this.state.list}
            deleteMessage={this.deleteMessage}
          />
        </div>
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
