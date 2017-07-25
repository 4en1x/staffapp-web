import React from "react";

import {
  Card,
  Header,
  Divider,
  Segment,
  Button,
  List,
  Rating,
  TextArea,
  Form
} from "semantic-ui-react";

import "./add-technical-feedback-page.css";
import FeedbackTechnicalCard from "../../../components/feedback/feedback-technical-card.jsx";

const major = {
  technology: "javascript"
};
const minor = [
  {
    technology: "c++"
  },
  {
    technology: ".net"
  },
  {
    technology: "react"
  }
];
const other = [
  {
    technology: "jogging"
  },
  {
    technology: "fishing"
  },
  {
    technology: "reading"
  }
];

export default class AddTechnicalFeedbackPage extends React.Component {
  constructor(props) {
    super(props);
    this.feedbackInfo = {};
  }

  inputHandle = (element, propName) => {
    this.feedbackInfo[propName] = element;
  };

  selectHandle = (value, propName) => {
    this.feedbackInfo[propName].select = value;
  };

  feedbackButtonClicked = () => {
    // this.props.addFeedback();
    const props = Object.keys(this.feedbackInfo);
    props.forEach(prop => {
      this.feedbackInfo[prop].input = this.feedbackInfo[prop].input.ref.value;
    });
    this.props.addFeedback(this.feedbackInfo);
  };

  render() {
    return (
      <div className="feedback-component">
        <Header dividing as="h2">
          Feedback 111
        </Header>
        <Card fluid>
            <Header as="h1">Description: </Header>
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
                  <Form>
                    <Form.Field>
                      <label>
                        Javascript <Rating maxRating={5} clearable />
                      </label>
                      <TextArea placeholder="Comment" />
                    </Form.Field>{" "}
                  </Form>
                </List.Item>
                <List.Item className="flex-block">
                  <List.Header>Secondary skills: </List.Header>
                  <List bulleted>
                    <List.Item className="flex-block">
                      <Form>
                        <Form.Field>
                          <label>
                            Javascript
                            <Rating maxRating={5} clearable />
                          </label>
                        </Form.Field>{" "}
                      </Form>
                    </List.Item>
                    <List.Item className="flex-block">
                      <Form>
                        <Form.Field>
                          <label>
                            Javascript
                            <Rating maxRating={5} clearable />
                          </label>
                        </Form.Field>{" "}
                      </Form>
                    </List.Item>
                  </List>
                </List.Item>
              </List>
            </div>
        </Card>
        <Button color="twitter" floated="right">
          Feedback
        </Button>
      </div>
    );
  }
}
