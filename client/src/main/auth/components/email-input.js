import React from "react";
import { Header, Form, Button, Icon } from "semantic-ui-react";

export default class EmailInputForm extends React.Component {
  constructor(props) {
    super(props);
  }

  onNextClicked = () => {
    this.props.inputHandle(this.input.value);
  };

  render() {
    return (
      <Form size="large">
        <Header as="h3">Log in</Header>
        <Form.Field>
          <input
            placeholder="joe@schmoe.com"
            ref={input => (this.input = input)}
          />
        </Form.Field>
        <Button
          color="twitter"
          floated="right"
          onClick={this.onNextClicked}
          animated
        >
          <Button.Content visible>Next</Button.Content>
          <Button.Content hidden>
            <Icon name="right arrow" />
          </Button.Content>
        </Button>
      </Form>
    );
  }
}
