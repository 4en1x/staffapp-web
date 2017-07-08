import React from 'react'
import EmailForm from './email-form/email-form.component';
import PasswordForm from './password-form/password-form.component'
import {Divider} from 'semantic-ui-react'
import {Image} from 'semantic-ui-react'
import logos from '../../assets/images';
import '../../index.css'

export default class AuthForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentState: 'email_input'
    };

    this.emailInputHandle = this.emailInputHandle.bind(this);
    this.passwordInputHandle = this.passwordInputHandle.bind(this);
  }

  emailInputHandle(value) {

    /*
      check email address and if email is valid, show password form (create request to server)
      else stay on email form
     */

    console.log(value);

    this.setState({currentState: 'password_input'});
  }


  passwordInputHandle(value) {

    /*
      check password and if password is valid, show password form (create request to server)
      else stay on email form
     */

    console.log(value);
  }

  render() {

    const currentState = this.state.currentState;
    let  form = <EmailForm inputHandle={this.emailInputHandle}/>;
    if (currentState !== 'email_input') form = <PasswordForm inputHandle={this.passwordInputHandle}/>;

    return (
      <div className="auth-form">
        <Image src={logos.logo1} size='small' />
        <Divider hidden />
        {form}
      </div>
    )
  }
}
