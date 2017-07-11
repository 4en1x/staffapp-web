import React from "react";
import { Image } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import images from "../../assets/images";
import "./header.css";

export default class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let user = this.props.user;

    return (
      <div className="header-component">
        <Image className="image" src={images.logo1} />
        <Header className="header-label">
          {user.name + " " + user.surname}
        </Header>
      </div>
    );
  }
}
