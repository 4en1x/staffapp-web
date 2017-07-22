import React from "react";
import { reduxForm } from "redux-form";

import { Divider, Segment, List } from "semantic-ui-react";

import "./add-technical-feedback-page.css";
import FeedbackTechnicalCard from "../../../components/feedback/feedback-technical-card";

class FeedbackTechnicalPage extends React.Component{

  onSubmitClicked = (value) => {
    console.log(value);

    let move = 0;
    let newArray = [];

    for (var key in value) {
      value[key].id = this.props.data.fields[move].id;
      newArray.push(value[key]);
      move++;
    }

     this.props.addFeedback({fields: newArray});
  };

  render() {
    const { handleSubmit, data } = this.props;

    return (
        <form
          onSubmit={handleSubmit(this.onSubmitClicked)}
          className="add-technical-feedback-page"
          >
          <div className="title-feedback">feedback</div>
          <Divider />
          <Segment id="content-data">
            <div className="labels"> Major skill </div>
            {data.fields.map(step => {
              if (step.type_skill === "primary") {
                return (
                  <FeedbackTechnicalCard
                    data={step}
                    location={"majorTechnology"}
                    key={data.id}
                    />
                );
              }
              return null;
            })}

          <List size="medium">
            <List.Header className="list-header">Minor skills</List.Header>
            {data.fields.map((step, move) => {
              if (step.type_skill === "secondary") {
                return (
                  <List.Item key={step.technology}>
                    <FeedbackTechnicalCard
                      data={step}
                      location={"MinorTechology" + move}
                      key={data.id}
                    />
                  </List.Item>
                );
              }
              return null;
            })}
          </List>

          <List size="medium">
            <List.Header className="list-header">Other skills</List.Header>
            {data.fields.map((step, move) => {
              if (step.type_skill === "other") {
                return (
                  <List.Item key={step.technology}>
                    <FeedbackTechnicalCard
                      data={step}
                      location={"OtherTechology" + move}
                      key={data.id}
                    />
                  </List.Item>
                );
              }
              return null;
            })}
          </List>
        </Segment>
        <div className="add-feedback-redux-button">
          <button type="submit">Feedback</button>
        </div>
      </form>
    );
  }
};

export default reduxForm({ form: "simple" })(FeedbackTechnicalPage);
