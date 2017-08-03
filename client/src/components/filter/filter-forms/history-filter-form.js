import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { Button, Dropdown, Header } from "semantic-ui-react";

const DropdownComponent = ({ input, label, items }) => {
    return (
        <div className="filter-item">
            <Header as="h3">
                {label}
            </Header>
            <Dropdown
                placeholder={label}
                fluid
                search
                selection
                multiple
                options={items}
                onChange={(event, obj) => input.onChange(obj.value)}
            />
        </div>
    );
};

const HistoryFilterForm = props => {
  const { handleSubmit, data } = props;

  const clone = Object.assign({}, data);
  Object.keys(clone).forEach(prop => {
    const items = clone[prop];
    clone[prop] = items.map(item => ({
      key: item,
      value: item,
      text: item
    }));
  });

  return (
    <form className="filter-form" onSubmit={handleSubmit}>
      {Object.keys(clone).map(item =>
              <Field
                  name={item}
                  label={item}
                  items={clone[item] || []}
                  component={DropdownComponent}
              />
      )}

      <div className="filter-item container-right">
        <Button color="twitter" icon="filter" content="Apply" type="submit" />
      </div>
    </form>
  );
};

export default reduxForm({ form: "HistoryFilterForm" })(HistoryFilterForm);

HistoryFilterForm.defaultProps = {
  data: {}
};
HistoryFilterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmitClicked: PropTypes.func.isRequired,
  data: PropTypes.shape({
    statuses: PropTypes.arrayOf(PropTypes.string),
    primarySkills: PropTypes.arrayOf(PropTypes.string),
    cities: PropTypes.arrayOf(PropTypes.string)
  })
};
