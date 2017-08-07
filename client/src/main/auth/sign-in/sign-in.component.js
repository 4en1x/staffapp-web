import React from "react";
import EmailInputForm from "../components/email-input";
import PasswordInputForm from "../components/password-input";
import { Image } from "semantic-ui-react";
import logos from "../../../assets/images";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from '../auth-actions';
import userService from '../../../service/user-service';
import "./sign-in.css";

const EMAIL = "EMAIL";
const PASSWORD = "PASSWORD";

class SignInComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentState: EMAIL,
      isLoading: false
    };
  }

  emailInputHandle = value => {
    this.email = value;
    this.setState({
      isLoading: true
    });
    userService.checkEmail({email: value}).then(res => {
        this.setState({ currentState: PASSWORD, isLoading: false });
      });
  };

  passwordInputHandle = value => {
    this.props.login({ email: this.email, password: value });
  };

  render() {
    let form = <EmailInputForm inputHandle={this.emailInputHandle} />;
    if (this.state.currentState !== EMAIL) {
      form = <PasswordInputForm inputHandle={this.passwordInputHandle} />;
    }

    if (!this.props.auth.isAuthError)
      return <Redirect to={{ pathname: "/" }} />;

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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, actionCreators)(SignInComponent);
