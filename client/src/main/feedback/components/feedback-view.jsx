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
      className="margin-stars"
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
    const { handleSubmit, submitting } = this.props;
    return (
      <form
        onSubmit={handleSubmit(this.prepareData)}
        className="feedback-component"
      >
        <Header dividing as="h2">
          {'Feedback ' + this.props.data.id}
        </Header>
        <Card fluid>
          <Header as="h1" className="feedback-component_header">Description: </Header>
          <List size="massive" className="grid-list inline">
            <List.Item className="flex-block">
              <List.Header>Interviewee: </List.Header> Name Surname
            </List.Item>
            <List.Item className="flex-block">
              <List.Header>Interviewer: </List.Header> Anatoliy Levakov
            </List.Item>
            <List.Item className="flex-block">
              <List.Header>Vacansy: </List.Header> Junior JS Developer
            </List.Item>
            <List.Item className="flex-block">
              <List.Header>Date:</List.Header> 01.01.1991
            </List.Item>
          </List>
          <Divider />
          <Header as="h1">Results: </Header>
          <div className="card-content">
            <List size="massive">
              <List.Item className="flex-block">
                <List.Header>Primary skill: </List.Header>
                {this.props.data.fields.map(step => {
                  if (step.typeSkill === 'primary')
                    return (
                      <div className="feedback-component_primary-skill">
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
              <List.Item className="flex-block">
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
          </div>
        </Card>
        <Button color="twitter" floated="right" primary disabled={submitting}>
          Feedback
        </Button>
      </form>
    );
  }
}

export default reduxForm({ form: 'feedback' })(FeedbackView);
