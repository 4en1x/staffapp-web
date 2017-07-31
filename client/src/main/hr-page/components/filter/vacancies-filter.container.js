import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addFilter } from '../../../vacany-detail-page/vacancy-actions';
import VacanciesFilterForm from '../../../../components/filter/filter-forms/vacancies-filter-form';

import './filter.css';

function check(values) {
  window.alert(JSON.stringify(values));
}

const Statuses = ['Pool ', 'In progress', 'Hired'].map(item => ({
  key: item,
  name: item
}));

const PrimarySkills = [
  '.NET',
  'C++',
  'DBE',
  'Java',
  'HTML/CSS',
  'JavaScript',
  'PHP',
  'Ruby on Rails',
  'Python'
].map(item => ({
  key: item,
  value: item,
  text: item
}));

const SecondarySkills = ['Angular', 'ReactJS', 'NodeJS'].map(item => ({
  key: item,
  value: item,
  text: item
}));

const Cities = ['Minsk', 'Moscow', 'London'].map(item => ({
  key: item,
  value: item,
  text: item
}));

const EnglishLevels = ['option_1', 'option_2', 'option_3'].map(item => ({
  key: item,
  value: item,
  text: item
}));

const data = {
  statuses: Statuses,
  primarySkills: PrimarySkills,
  secondarySkills: SecondarySkills,
  cities: Cities,
  englishLevels: EnglishLevels
};

class FilterComponent extends React.Component {
  onSumbitClicked = filter => {
    console.log(filter);
    this.props.addFilter(filter);
  };

  render() {

    //if (!filter.props.filterValues) return <p />;

    return (
      <div className="filter-container">
        <VacanciesFilterForm onSubmitClicked={this.onSumbitClicked} data={data} />
      </div>
    );
  }
}

FilterComponent.propTypes = {
  form: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    filterValues: state.vacancy.filterValues
  };
};

export default connect(mapStateToProps, { addFilter })(FilterComponent);
