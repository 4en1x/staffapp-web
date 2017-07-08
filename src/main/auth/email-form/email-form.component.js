import React from 'react'
import {Button} from 'semantic-ui-react'
import {Form} from 'semantic-ui-react'

export default class EmailForm extends React.Component {

  constructor(props) {
    super(props);

    this.onNextClicked = this.onNextClicked.bind(this);
  }

  onNextClicked() {
    this.props.inputHandle(this.input.value);
  }

  render() {
    return (
      <Form size='large' key='large'>
        <Form.Field>
          <label>Log in</label>
          <input placeholder='joe@schmoe.com' ref={input => this.input = input}/>
        </Form.Field>
        <Button onClick={this.onNextClicked}>NEXT</Button>
      </Form>
    )
  }
}
