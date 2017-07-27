import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

export default function checkAuth(Component) {
  class Authorization extends React.Component {
    render() {
      const user = this.props.auth;
      return user.isAuthError
        ? <Redirect to="login" />
        : <Component {...this.props} user={user} />;
    }
  }

  function mapStateToProps(state) {
    return {
      auth: state.auth
    };
  }

  return connect(mapStateToProps)(Authorization);
}
