import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import axios from "axios";

export default function checkAuth(Component) {
  class Authorization extends React.Component {
    constructor(props) {
      super(props);
    };

    render() {
      const user = this.props.auth;
      if (!user) return <Redirect to="login" />;
      return <Component {...this.props} user={user} />
    }
  }

  function mapStateToProps(state) {
    console.log(state);
    return {
      auth: state.auth
    }
  };

  return connect(mapStateToProps)(Authorization);
}
