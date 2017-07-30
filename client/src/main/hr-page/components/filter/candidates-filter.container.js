import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addFilter } from '../../../candidate/candidate-actions';
import CandidatesFilterForm from '../../../../components/filter/filter-forms/candidates-filter-form';

import './filter.css';

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
  componentDidMount() {}

  onSubmitClicked = filter => {

    Object.keys(filter).forEach(prop => {
      if (!filter[prop] || !filter[prop].length) delete filter[prop];
    });

    this.props.addFilter(filter);
  };

  render() {
    //if (!filter.props.filterValues) return <p />;

    return (
      <div className="filter-container">
        <CandidatesFilterForm onSubmit={this.onSubmitClicked} data={data} />
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
