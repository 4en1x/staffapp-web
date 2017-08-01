import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { isAuthorized } from './auth-actions';
import SemanticLoader from '../../components/loaders/semantic-loader';

export default function checkAuth(Component) {
  class Authorization extends React.Component {
    componentDidMount() {
      if (this.props.auth.isAuthError) this.props.isAuthorized();
    }

    render() {
      const user = this.props.auth;
      if (user.tryLoginWithCookies) return <SemanticLoader/>;
      if (user.isAuthError) return <Redirect to="/login" />;
      return <Component {...this.props} user={user} />;
    }
  }

  function mapStateToProps(state) {
    return {
      auth: state.auth
    };
  }

  return connect(mapStateToProps, { isAuthorized })(Authorization);
}
