import React from "react";
import PropTypes from "prop-types";
import { Image, Header } from "semantic-ui-react";
import images from "../../assets/images";
import "./header.css";

export default class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const user = this.props.user;

    return (
      <div className="header-component">
        <Image className="image" src={images.logo1} />
        <Header as="h3" id="header-label">
          {user.name}
        </Header>
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
