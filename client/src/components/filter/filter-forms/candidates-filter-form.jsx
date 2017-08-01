import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import AccordionComponent from '../components/accordion.component';
import DropdownComponent from '../components/dropdown.component';

const CandidatesFilterForm = props => {
  const { handleSubmit, onSubmit, data } = props;

  const clone = Object.assign({}, data);
  Object.keys(clone).forEach(prop => {
    if (prop !== 'statuses') {
      const items = clone[prop];
      clone[prop] = items.map(item => ({
        key: item,
        value: item,
        text: item
      }));
    }
  });

  return (
    <form className="filter-form" onSubmit={handleSubmit(onSubmit)}>
      <Field
        name="status"
        label="Status"
        items={clone.statuses}
        component={AccordionComponent}
      />
      <Field
        name="primarySkill"
        label="Primary Skill"
        items={clone.primarySkills}
        component={DropdownComponent}
      />
      <Field
        name="secondarySkill"
        label="Secondary skill"
        items={clone.secondarySkills}
        component={DropdownComponent}
      />
      <Field
        name="englishLevel"
        label="English level"
        items={clone.englishLevels}
        component={DropdownComponent}
      />
      <div className="filter-item right">
        <Button
          color="twitter"
          icon="file text"
          content="Report"
          onClick={props.onReportClicked}
        />
        <Button color="twitter" icon="filter" content="Apply" type="submit" />
      </div>
    </form>
  );
};

export default reduxForm({ form: 'CandidatesFilterForm' })(
  CandidatesFilterForm
);

CandidatesFilterForm.defaultProps = {
  data: {}
};

CandidatesFilterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.shape({
    statuses: PropTypes.arrayOf(PropTypes.string),
    primarySkills: PropTypes.arrayOf(PropTypes.string),
    secondarySkills: PropTypes.arrayOf(PropTypes.string)
  })
};
