import React from "react";
import PropTypes from "prop-types";
import { Dropdown, Header } from "semantic-ui-react";

const DropdownComponent = ({ input, label, items }) =>
  <div className="filter-item">
    <Header as="h3">
      {label}
    </Header>
    <Dropdown
      placeholder="Any"
      fluid
      search
      selection
      multiple
      options={items}
      onChange={(event, obj) => input.onChange(obj.value)}
    />
  </div>;

export default DropdownComponent;

DropdownComponent.defaultProps = {
  label: "",
  items: []
};

DropdownComponent.propTypes = {
  input: PropTypes.func.isRequired,
  label: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string)
};
