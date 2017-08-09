import React from 'react';
import { Button } from 'semantic-ui-react';
import './custom-button.css';

const CustomButton = props =>
  <Button
    className="custom-button"
    fluid
    content={props.content}
    icon={props.icon}
    labelPosition={props.labelPosition}
    color={props.color}
    onClick={props.onClick}
  />;

export default CustomButton;
