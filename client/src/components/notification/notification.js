import React from "react";
import { Label, Menu, Divider } from "semantic-ui-react";
import "./notification.css";

export default class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: "" };
    document.addEventListener("click", this.hideMessages, false);
  }

  hideMessages = event => {
    if (
      event.target.tagName != "SPAN" &&
      document.getElementById("notification-label")
    )
      document.getElementById("notification-label").style.display = "none";
  };
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;
    return (
      <Label basic pointing id="notification-label">
        <Menu secondary vertical size="huge">
          <Menu.Item header size="huge">
            Your messages
          </Menu.Item>
          <Divider />
            {this.props.messages.map(message =>
                <Menu.Item
                    as="span"
                    name={message}
                    active={activeItem ===message}
                    onClick={this.handleItemClick}
                    size="huge"
                />

            )}
        </Menu>
      </Label>
    );
  }
}
