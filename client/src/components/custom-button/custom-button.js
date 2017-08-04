import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import './custom-button.css';

const CustomButton = props =>
  <Link to={props.to} className="add-button-container">
    <Button
      className="add-button"
      fluid
      content={props.content}
      icon={props.icon}
      labelPosition="left"
      color={props.color}
    />
  </Link>;

export default CustomButton;
