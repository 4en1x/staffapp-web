import React from "react";
import { PropTypes } from "prop-types";
import { Segment } from "semantic-ui-react";
import "./candidate-list-item.css";

const CandidateListItem = props => {
  const data = props.data;
  return (
    <Segment className="candidate-item-content">
      <div className="content-top">
        <div className="name-label">
          {" "}{data.name}{" "}
        </div>
        <div className="status-label">
          {" "}{data.status}{" "}
        </div>
      </div>
      <div className="technology">
        {" "}{data.technology}{" "}
      </div>
      <div className="content-extra">
        <div> city</div>
        <div> time</div>
      </div>
    </Segment>
  );
};

CandidateListItem.defaultProps = {
  data: {}
};

CandidateListItem.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string
  })
};

export default CandidateListItem;
