import React from "react";
import { PropTypes } from "prop-types";
import "./feedback-technacal-card.css";

const FeedbackTechnicalCard = props => {
  const data = props.data;
  return (
    <div className="feedback-technacal-card">
      <div className="content-top">
        <div className="technology-label">
          {data.technology}
        </div>
        <div>
          <select className="select-grade">
            <option value="one">one</option>
            <option value="two">two</option>
            <option value="three">three</option>
            <option value="four">four</option>
            <option value="fife">fife</option>
            <option value="six">six</option>
            <option value="seven">seven</option>
            <option value="eight">eight</option>
            <option value="nine">nine</option>
            <option value="ten">ten</option>
          </select>
        </div>
      </div>
      <textarea placeholder="unput description" className="text-area" />
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
