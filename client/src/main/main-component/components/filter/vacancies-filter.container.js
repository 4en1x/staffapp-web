import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addFilter, getFilterValues } from '../../../vacancy/vacancy-actions';
import VacanciesFilterForm from '../../../../components/filter/filter-forms/vacancies-filter-form';
import './filter.css';

class FilterComponent extends React.Component {
  componentDidMount() {
    this.props.getFilterValues();
  }

  onSubmitClicked = filter => {
    console.log(filter);
    this.props.addFilter(filter);
  };

  render() {

    return (
      <div className="filter-container">
        <VacanciesFilterForm
          onSubmitClicked={this.onSubmitClicked}
          data={this.props.filterValues}
        />
      </div>
    );
  }
}

FilterComponent.propTypes = {
  form: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    filterValues: state.vacancy.filterValues || {}
  };
};

export default connect(mapStateToProps, { addFilter, getFilterValues })(
  FilterComponent
);
