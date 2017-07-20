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
    technology: "net"
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

const feedbackID = 12345;
let data;
var instance = axios
  .get("/feedbacks" + feedbackID)
  .then(function(response) {
    data = JSON.parse(response);
  })
  .catch(function(error) {
    alert("OOPS something wrong");
  });

data.fields;

const FeedbackTechnicalPage = props => {
  const { handleSubmit, submitting } = props;
  return (
    <form onSubmit={handleSubmit} className="add-technical-feedback-page">
      <div className="title-feedback">feedback</div>
      <Divider />
      <Segment id="content-data">
        <div className="labels"> Major skill </div>
        {data.fields.map(step => {
          if (step.typeSkill === "primary")
            return (
              <FeedbackTechnicalCard data={step} location="MajorTechology" />
            );
          return null;
        })}

        <List size="medium">
          <List.Header className="list-header">Minor skills</List.Header>

          {/*{minor.map((step, move) =>*/}
          {/*<List.Item key={step.technology}>*/}
          {/*<FeedbackTechnicalCard*/}
          {/*data={step}*/}
          {/*location={"MajorTechology" + move}*/}
          {/*/>*/}
          {/*</List.Item>*/}
          {/*)}*/}

          {data.fields.map(step => {
            if (step.typeSkill === "secondary")
              return (
                <List.Item key={step.technology}>
                  <FeedbackTechnicalCard
                    data={step}
                    location="MinorTechology"
                  />
                </List.Item>
              );
            return null;
          })}
        </List>
        <List size="medium">
          <List.Header className="list-header">Other skills</List.Header>
          {/*{other.map((step, move) =>*/}
          {/*<List.Item key={step.technology}>*/}
          {/*<FeedbackTechnicalCard*/}
          {/*data={step}*/}
          {/*location={"OtherTechology" + move}*/}
          {/*/>*/}
          {/*</List.Item>*/}
          {/*)}*/}

          {data.fields.map(step => {
            if (step.typeSkill === "other")
              return (
                <List.Item key={step.technology}>
                  <FeedbackTechnicalCard
                    data={step}
                    location="OtherTechology"
                  />
                </List.Item>
              );
            return null;
          })}
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
