import React from "react";
import EmailInputForm from "../components/email-input";
import PasswordInputForm from "../components/password-input";
import { Image } from "semantic-ui-react";
import logos from "../../../assets/images";
import {Redirect} from 'react-router-dom';
import "./sign-in.css";

const EMAIL = "EMAIL";
const PASSWORD = "PASSWORD";

export default class SignInComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentState: EMAIL,
      isAuthorize: false
    };
  }

  emailInputHandle = value => {
    /*
      check email address and if email is valid, show password form (create request to server)
      else stay on email form
     */
    let users = JSON.parse(localStorage.getItem('users'));
    if (!users) return;
    let findUser = users.find(user => (
      value === user.name
    ));
    if(!findUser) return;
    this.setState({ currentState: PASSWORD });
  };

  passwordInputHandle = value => {
    /*
      check password and if password is valid, show password form (create request to server)
      else stay on email form
     */

    this.setState({isAuthorize: true});
  };

  render() {

    let user = {name: 'Sergey', role: 'Worker'};

    let form = <EmailInputForm inputHandle={this.emailInputHandle} />;
    if (this.state.currentState !== EMAIL) {
      form = <PasswordInputForm inputHandle={this.passwordInputHandle} />;
    }

    if (this.state.isAuthorize) return <Redirect to={{pathname: '/', state: user}}/>;

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
