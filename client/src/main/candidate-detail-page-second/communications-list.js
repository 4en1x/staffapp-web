import React from "react";
import { List} from "semantic-ui-react";
import "./communications-list.css";
import "./candidate.css";


const CommunicationsList = props => {
  return (
    <List className="communications-list">
      <List.Item />
      <List.Item>
        <div className="item-with-label">
          resume
         <div className="email-font-size"> {props.data.communication.resume}</div>
        </div>
      </List.Item>
      <List.Item>
        <div className="item-with-label">
          salary
            <div className="email-font-size"> {props.data.communication.salary}</div>
        </div>
      </List.Item>
    </List>
  );
};

export default CommunicationsList;