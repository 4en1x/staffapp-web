import React from "react";
import { reduxForm } from "redux-form";

import { Divider, Segment, List } from "semantic-ui-react";

import "./add-technical-feedback-page.css";
import FeedbackTechnicalCard from "../../../components/feedback/feedback-technical-card";

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

const FeedbackTechnicalPage = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit} className="add-technical-feedback-page">
      <div className="title-feedback">feedback</div>
      <Divider />
      <Segment id="content-data">
        <div className="labels"> Major skill </div>
        <FeedbackTechnicalCard data={major} location="MajorTechology" />
        <List size="medium">
          <List.Header className="list-header">Minor skills</List.Header>
          {minor.map((step, move) =>
            <List.Item key={step.technology}>
              <FeedbackTechnicalCard
                data={step}
                location={"MinorTechology" + move}
              />
            </List.Item>
          )}
        </List>
        <List size="medium">
          <List.Header className="list-header">Other skills</List.Header>
          {other.map((step, move) =>
            <List.Item key={step.technology}>
              <FeedbackTechnicalCard
                data={step}
                location={"OtherTechology" + move}
              />
            </List.Item>
          )}
        </List>
      </Segment>
      <div className="add-feedback-redux-button">
        <button type="submit" disabled={submitting}>
          Feedback
        </button>
      </div>
    </form>
  );
};

export default reduxForm({ form: "simple" })(FeedbackTechnicalPage);
