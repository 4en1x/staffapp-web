import React from "react";
import { PropTypes } from "prop-types";
import { Select, TextArea } from "semantic-ui-react";
import "./feedback-technical-card.css";

const grades = [
  { key: "one", value: "one", text: "one" },
  { key: "two", value: "two", text: "two" },
  { key: "three", value: "three", text: "three" },
  { key: "four", value: "four", text: "four" },
  { key: "fife", value: "fife", text: "fife" },
  { key: "six", value: "six", text: "six" },
  { key: "seven", value: "seven", text: "seven" },
  { key: "eight", value: "eight", text: "eight" },
  { key: "nine", value: "nine", text: "nine" },
  { key: "ten", value: "ten", text: "ten" }
];
const FeedbackTechnicalCard = props => {
  const data = props.data;
  return (
    <div className="feedback-technacal-card">
      <div className="content-top">
        <div className="technology-label">
          {data.technology}
        </div>
        <div>
          <Select
            placeholder="grade"
            options={grades}
            className="select-grade"
          />
        </div>
      </div>
      <TextArea placeholder="Add discription" className="text-area" />
    </div>
  );
};

FeedbackTechnicalCard.defaultProps = {
  data: {}
};

FeedbackTechnicalCard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string
  })
};

export default FeedbackTechnicalCard;
