import React from "react";
import { Header, Form, Button } from "semantic-ui-react";

export default class PasswordInputForm extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmitClicked = () => {
    this.props.inputHandle(this.input.value);
  };

  render() {
    return (
      <Form size="large">
        <Header as="h3">Password</Header>
        <Form.Field>
          <input
            placeholder="password"
            type="password"
            ref={input => (this.input = input)}
          />
        </Form.Field>
        <Button
          color="twitter"
          floated="right"
          onClick={this.onSubmitClicked}
        >
          Submit
        </Button>
      </Form>
    );
  }
}
