import React from "react";
import { Field } from "redux-form";
import "./feedback-technical-card.css";

// import { PropTypes } from "prop-types";

const FeedbackTechnicalCard = props => {
  const { data, location } = props;
  return (
    <div className="feedback-technical-card">
      <div className="content-top">
        <div className="technology-label">
          {data.technology}
        </div>
        <div>
          <Field
            name={"grade" + location}
            component="select"
            className="select-grade"
          >
            <option />
            <option value="1">one</option>
            <option value="2">two</option>
            <option value="3">three</option>
            <option value="4">four</option>
            <option value="5">fife</option>
            <option value="6">six</option>
            <option value="7">seven</option>
            <option value="8">eight</option>
            <option value="9">nine</option>
            <option value="10">ten</option>
          </Field>
        </div>
      </div>
      <Field
        name={"description" + location}
        component="input"
        type="text"
        placeholder="Add description"
        className="text-area"
      />
    </div>
  );
};

// FeedbackTechnicalCard.defaultProps = {
//   data: {}
// };
//
// FeedbackTechnicalCard.propTypes = {
//   data: PropTypes.shape({
//     name: PropTypes.string
//   })
// };

export default FeedbackTechnicalCard;
// export default reduxForm({ form: "simple" })(FeedbackTechnicalCard);
