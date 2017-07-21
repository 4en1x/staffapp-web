import React from "react";
import { reduxForm } from "redux-form";

import { Divider, Segment, List } from "semantic-ui-react";

import "./add-technical-feedback-page.css";
import FeedbackTechnicalCard from "../../../components/feedback/feedback-technical-card";

const feedbackID = 12345;
let data;
   axios.get("/feedbacks/" + feedbackID)
  .then(function(response) {
    data = JSON.parse(response);
  })
  .catch(function(error) {
    alert("OOPS something wrong");
  });

// const data = {
//   fields: [
//     {
//       id: 11,
//       name: "C++ level",
//       typeSkill: "primary",
//       feedbackId: 5,
//       type: "tech"
//     },
//     {
//       id: 12,
//       name: "Some skill one",
//       typeSkill: "secondary",
//       feedbackId: 5,
//       type: "tech"
//     },
//     {
//       id: 13,
//       name: "some skill two",
//       typeSkill: "secondary",
//       feedbackId: 5,
//       type: "tech"
//     },
//     {
//       id: 14,
//       name: "Some other skill one",
//       typeSkill: "other",
//       feedbackId: 5,
//       type: "tech"
//     },
//     {
//       id: 15,
//       name: "Some other skill two",
//       typeSkill: "other",
//       feedbackId: 5,
//       type: "tech"
//     },
//     {
//       id: 16,
//       name: "Some other skill three",
//       typeSkill: "other",
//       feedbackId: 5,
//       type: "tech"
//     }
//   ]
// };

function showResults(values) {
  let move = 0;
  let newArray = [];

  for (var key in values) {
    values[key].id = data.fields[move].id;
    newArray.push(values[key]);
    move++;
  }
  console.log(newArray);

  axios.put("feedbacks/feedbackID", {
      fields: newArray
    });
}

const FeedbackTechnicalPage = props => {
  const { handleSubmit } = props;

  return (
    <form
      onSubmit={handleSubmit(showResults)}
      className="add-technical-feedback-page"
    >
      <div className="title-feedback">feedback</div>
      <Divider />
      <Segment id="content-data">
        <div className="labels"> Major skill </div>
        {data.fields.map(step => {
          if (step.typeSkill === "primary") {
            return (
              <FeedbackTechnicalCard data={step} location={"majorTechnology"} />
            );
          }
          return null;
        })}

        <List size="medium">
          <List.Header className="list-header">Minor skills</List.Header>
          {data.fields.map((step, move) => {
            if (step.typeSkill === "secondary") {
              return (
                <List.Item key={step.technology}>
                  <FeedbackTechnicalCard
                    data={step}
                    location={"MinorTechology" + move}
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
            if (step.typeSkill === "other") {
              return (
                <List.Item key={step.technology}>
                  <FeedbackTechnicalCard
                    data={step}
                    location={"OtherTechology" + move}
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
};

export default reduxForm({ form: "simple" })(FeedbackTechnicalPage);
