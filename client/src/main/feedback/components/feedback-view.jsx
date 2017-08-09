import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Card,
  Header,
  Divider,
  Button,
  List,
  Rating,
  TextArea,
  Form,
  Accordion
} from 'semantic-ui-react';
import './feedback-view.css';

class FeedbackView extends React.Component {
  constructor(props) {
    super(props);
    this.init(this.props.data);
  }

  init = data => {
    const initData = {};
    data.fields.map(step => {
      initData['' + step.typeSkill + step.id] = {
        ...initData['' + step.typeSkill + step.id],
        id: step.id,
        name: step.name,
        typeSkill: step.typeSkill,
        type: step.type
      };
    });
    this.props.initialize(initData);
  };

  starsInput = ({ input }) =>
    <Rating
      maxRating={5}
      clearable
      value={input.value}
      onRate={(param, data) => {
        input.onChange(data.rating);
      }}
    />;
  descriptionInput = ({ input }) =>
    <Form>
      <TextArea
        value={input.value}
        onChange={(param, data) => {
          input.onChange(data.value);
        }}
        placeholder="Comment"
      />
    </Form>;
  prepareData = values => {
    let data = { fields: [] };
    for (const prop in values) data.fields.push(values[prop]);
    this.props.onSubmitClicked(data);
  };

  render() {
    console.log(this.props);
    const { handleSubmit, submitting } = this.props;
    return (
      <div className="page-content" onSubmit={handleSubmit(this.prepareData)}>
        <div className="content-tab background padded">
          <Header as="h1" content={`Feedback ${this.props.data.id}`} />
        </div>

        <form className="content-tab background padded">
          <Header as="h1" textAlign="center">
            Results:
          </Header>

          <List size="massive">
            <List.Item>
              <List.Header>Primary skill: </List.Header>
              {this.props.data.fields.map(step => {
                if (step.typeSkill === 'primary')
                  return (
                    <div className="feedback-results_primary-skill">
                      <label>
                        {step.name}
                        <Field
                          name={'primary' + step.id + '.value'}
                          component={this.starsInput}
                        />
                      </label>
                      <Field
                        name={'primary' + step.id + '.comment'}
                        component={this.descriptionInput}
                      />
                    </div>
                  );
              })}
            </List.Item>
            <List.Item>
              <List.Header>Secondary skills: </List.Header>
              <List>
                {this.props.data.fields.map(step => {
                  if (step.typeSkill === 'secondary')
                    return (
                      <List.Item className="flex-block">
                        <Accordion fluid>
                          <Accordion.Title className="display-accordion">
                            {step.name}
                          </Accordion.Title>
                          <Field
                            name={'secondary' + step.id + '.value'}
                            component={this.starsInput}
                          />
                          <Accordion.Content>
                            <Field
                              name={'secondary' + step.id + '.comment'}
                              component={this.descriptionInput}
                            />
                          </Accordion.Content>
                        </Accordion>
                      </List.Item>
                    );
                })}
              </List>
            </List.Item>
            <List.Item className="flex-block">
              <List.Header>Other skills: </List.Header>
              <List>
                {this.props.data.fields.map(step => {
                  if (step.typeSkill === 'other')
                    return (
                      <List.Item className="flex-block">
                        <Accordion fluid>
                          <Accordion.Title className="display-accordion">
                            {step.name}
                          </Accordion.Title>
                          <Field
                            name={'other' + step.id + '.value'}
                            component={this.starsInput}
                          />
                          <Accordion.Content>
                            <Field
                              name={'other' + step.id + '.comment'}
                              component={this.descriptionInput}
                            />
                          </Accordion.Content>
                        </Accordion>
                      </List.Item>
                    );
                })}
              </List>
            </List.Item>
          </List>
          <div className="buttons">
            <Button color="twitter" disabled={submitting}>
              Send
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({ form: 'feedback' })(FeedbackView);
