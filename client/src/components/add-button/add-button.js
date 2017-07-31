import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import './add-button.css';
const AddButton = props =>
  <Link to={props.to} className="add-button-container">
    <Button
      className="add-button"
      fluid
      content={props.content}
      icon="add"
      labelPosition="left"
      color="twitter"
    />
  </Link>;

export default AddButton;
