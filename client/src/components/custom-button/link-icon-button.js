import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import './custom-button.css';

const LinkIconButton = props =>
  <Link to={props.to} className="add-button-container">
    <Button
      className="custom-button"
      fluid
      content={props.content}
      icon={props.icon}
      labelPosition={props.labelPosition}
      color={props.color}
    />
  </Link>;

export default LinkIconButton;
