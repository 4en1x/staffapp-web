import React from "react";
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

export default class FilterComponent extends React.Component {
  render() {
    const FilterForm = this.props.form;
    return (
      <div className="filter-container">
        <FilterForm
          onSubmit={check}
          statuses={Statuses}
          primarySkills={PrimarySkills}
          secondarySkills={SecondarySkills}
        />
      </div>
    );
  }
}
