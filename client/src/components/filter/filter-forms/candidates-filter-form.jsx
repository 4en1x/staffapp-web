import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import DropdownComponent from '../components/dropdown.component';
import ReportDownloadComponent from '../components/report-download.component';

const CandidatesFilterForm = props => {
  const { handleSubmit, onSubmit, data } = props;

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
    <form className="filter-form" onSubmit={handleSubmit(onSubmit)}>
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
        name="englishLevel"
        label="English level"
        items={clone.englishLevels || []}
        component={DropdownComponent}
      />

      <div className="filter-item container-right">
        <Button
          color="twitter"
          icon="file text"
          content="Report"
          onClick={props.onReportClicked}
        />
        <ReportDownloadComponent />

        <Button color="twitter" icon="filter" content="Apply" type="submit" />
      </div>
    </form>
  );
};

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

export default reduxForm({ form: 'CandidatesFilterForm' })(
  CandidatesFilterForm
);
