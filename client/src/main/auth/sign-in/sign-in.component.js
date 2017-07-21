import React from "react";
import EmailInputForm from "../components/email-input";
import PasswordInputForm from "../components/password-input";
import { Image } from "semantic-ui-react";
import logos from "../../../assets/images";
import {Redirect} from 'react-router-dom';
import {addUser} from '../../../action-creators/action-creators.js';
import {postUser} from '../../../action-creators/action-creators.js';
import { connect } from 'react-redux'
import axios from 'axios';
import "./sign-in.css";

const EMAIL = "EMAIL";
const PASSWORD = "PASSWORD";

class SignInComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentState: EMAIL,
    };
  }

  emailInputHandle = value => {
    this.email = value;
    axios.post('http://localhost:3300/email', {email: value}).then(responce => {
      console.log(responce);
      if (responce.status === 200) this.setState({ currentState: PASSWORD });
    });
  };

  passwordInputHandle = value => {
    this.props.onSubmitClicked({email: this.email, password: value});
  };

  render() {
    let user = {name: 'Sergey', role: 'Worker'};

    let form = <EmailInputForm inputHandle={this.emailInputHandle} />;
    if (this.state.currentState !== EMAIL) {
      form = <PasswordInputForm inputHandle={this.passwordInputHandle} />;
    }

    if (!this.props.auth.isAuthError) return <Redirect to={{pathname: '/', state: user}}/>;

    return (
      <div className="auth-container">
        <div className="auth-form">
          <div className="auth-form-header">
            <Image src={logos.logo1} height="30px" verticalAlign="bottom" />
          </div>
          {form}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitClicked: (user) => {
      dispatch(postUser(user))
    }
  }
}

export default connect(mapStateToProps ,mapDispatchToProps)(SignInComponent);
