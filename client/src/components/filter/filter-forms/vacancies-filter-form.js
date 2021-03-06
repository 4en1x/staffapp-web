import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import DropdownComponent from '../components/dropdown.component';

const VacanciesFilterForm = props => {
  const { handleSubmit, onSubmitClicked, data } = props;

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
    <form className="filter-form" onSubmit={handleSubmit(onSubmitClicked)}>
      <Field
        name="status"
        label="Status"
        items={clone.statuses || []}
        component={DropdownComponent}
      />
      <Field
        name="primarySkill"
        label="Primary Skill"
        items={clone.primarySkills || []}
        component={DropdownComponent}
      />
      <Field
        name="secondarySkills"
        label="Secondary skill"
        items={clone.secondarySkills || []}
        component={DropdownComponent}
      />
      <Field
        name="city"
        label="City"
        items={clone.cities || []}
        component={DropdownComponent}
      />
      <div className="filter-item container-right">
        <Button color="twitter" icon="filter" content="Apply" type="submit" />
      </div>
    </form>
  );
};

VacanciesFilterForm.defaultProps = {
  data: {}
};

VacanciesFilterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmitClicked: PropTypes.func.isRequired,
  data: PropTypes.shape({
    statuses: PropTypes.arrayOf(PropTypes.string),
    primarySkills: PropTypes.arrayOf(PropTypes.string),
    cities: PropTypes.arrayOf(PropTypes.string)
  })
};

export default reduxForm({ form: 'VacanciesFilterForm' })(VacanciesFilterForm);
