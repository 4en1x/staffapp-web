import React from 'react';
import { Image, Dropdown, Icon } from 'semantic-ui-react';
import HRNavigationBar from '../../components/hr-navigation-bar/navigation-bar';

import Notification from '../notification/notification';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import images from '../../assets/images';
import './header.css';
import NotificationService from '../../service/notification-service';

///////////////// messages ////
// const messages = NotificationService.getMessageList();
const messages = [
  {
    id: 50,
    text: 'You have one assigned interview today at 15:35',
    interviewId: 1
  },
  {
    id: 51,
    text: 'You have one assigned interview today at 15:35',
    interviewId: 2
  },
  {
    id: 52,
    text: 'You have one assigned interview today at 15:35',
    interviewId: 6
  },
  {
    id: 53,
    text: 'You have one assigned interview today at 15:35',
    interviewId: 7
  },
  {
    id: 54,
    text: 'You have one assigned interview today at 15:35',
    interviewId: 8
  },
  {
    id: 55,
    text: 'You have one assigned interview today at 15:35',
    interviewId: 9
  }
];
const removeMessage = item => {
  messages.splice(messages.indexOf(item), 1);
  // NotificationService.deleteMessageById(item.id);
};
///////////////////////////////

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
  config = () => ({
    // admin: AdminPage,
    hr: <HRNavigationBar />
    //user: WorkerPage
  });
  render() {
    const config = this.config();
    const user = this.props.user;
    console.log(config[user.role]);
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
          <Notification messages={messages} removeMessage={removeMessage} />
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
