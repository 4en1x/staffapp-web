import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { Button } from "semantic-ui-react";
import AccordionComponent from "../components/accordion.component";
import DropdownComponent from "../components/dropdown.component";

const CandidatesFilterForm = props => {
  const { handleSubmit, onSubmit, data } = props;
  return (
    <form className="filter-form" onSubmit={handleSubmit(onSubmit)}>
      <Field
        name="status"
        label="Status"
        items={data.statuses}
        component={AccordionComponent}
      />
      <Field
        name="primarySkill"
        label="Primary Skill"
        items={data.primarySkills}
        component={DropdownComponent}
      />
      <Field
        name="secondarySkill"
        label="Secondary skill"
        items={data.secondarySkills}
        component={DropdownComponent}
      />
        <Field
            name="englishLevel"
            label="English level"
            items={data.englishLevels}
            component={DropdownComponent}
        />
      <div className="filter-item right">
        <Button color="twitter" icon="filter" content="Apply" type="submit" />
      </div>
    </form>
  );
};

export default reduxForm({ form: "CandidatesFilterForm" })(
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
