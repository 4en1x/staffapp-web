import React from "react";
import PropTypes from "prop-types";
import { Accordion, Menu, Icon } from "semantic-ui-react";

import "./accordion.css";

const AccordionComponent = ({ input, label, items }) =>
  <Accordion as="h3" className="filter">
    <Accordion.Title>
      {label}
      <Icon name="triangle down" />
    </Accordion.Title>
    <Accordion.Content>
      <Menu
        size="large"
        text
        vertical
        items={items}
        onItemClick={(event, obj) => input.onChange(obj.name)}
      />
    </Accordion.Content>
  </Accordion>;

export default AccordionComponent;

AccordionComponent.defaultProps = {
  input: {},
  label: "",
  items: []
};

AccordionComponent.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired
  }),
  label: PropTypes.string,
  items: PropTypes.arrayOf(React.PropTypes.string)
};
