import React from "react";
import PropTypes from "prop-types";
import "./filter.css";

function check(values) {
  window.alert(JSON.stringify(values));
}
const Statuses = ["Pool ", "In progress", "Hired"].map(item => ({
  key: item,
  name: item
}));

const PrimarySkills = [
  ".NET",
  "C++",
  "DBE",
  "Java",
  "HTML/CSS",
  "JavaScript",
  "PHP",
  "Ruby on Rails",
  "Python"
].map(item => ({
  key: item,
  value: item,
  text: item
}));

const SecondarySkills = ["Angular", "ReactJS", "NodeJS"].map(item => ({
  key: item,
  value: item,
  text: item
}));

const Cities = ["Minsk", "Moscow", "London"].map(item => ({
  key: item,
  value: item,
  text: item
}));

const data = {
  statuses: Statuses,
  primarySkills: PrimarySkills,
  secondarySkills: SecondarySkills,
  cities: Cities
};

export default class FilterComponent extends React.Component {
  render() {
    const FilterForm = this.props.form;
    console.log(FilterForm);
    return (
      <div className="filter-container">
        <FilterForm onSubmit={check} data={data} />
      </div>
    );
  }
}

FilterComponent.propTypes = {
  form: PropTypes.func.isRequired
};
