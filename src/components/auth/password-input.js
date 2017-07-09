import React from 'react'
import {Button} from 'semantic-ui-react'
import {Form} from 'semantic-ui-react'

export default class PasswordInputForm extends React.Component {

  constructor(props) {
    super(props);

    this.onSubmitClicked = this.onSubmitClicked.bind(this);
  }

  onSubmitClicked = () => {
    this.props.inputHandle(this.input.value);
  };

  render() {
    return (
      <Form size='large' key='large'>
        <Form.Field>
          <label>Log in</label>
          <input placeholder='password' type='password' ref={input => this.input = input}/>
        </Form.Field>
        <Button onClick={this.onSubmitClicked}>Submit</Button>
      </Form>
    )
  }
}
