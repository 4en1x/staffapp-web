import React from "react";
import { Segment } from "semantic-ui-react";
import "./candidate-list-item.css";

const CandidateListItem = props => {
  const data = props.element;
  return (
    <Segment className="candidate-item-content">
      <div className="content-top">
        <div className="name-label">
          {data.name}
        </div>
        <div className="status-label">
          {data.status}
        </div>
      </div>
      <div className="technology">
        {data.technology}
      </div>
      <div className="content-extra">
        <div>
          {data.city}
        </div>
        <div>
          {data.time}
        </div>
      </div>
    </Segment>
  );
};

export default CandidateListItem;
