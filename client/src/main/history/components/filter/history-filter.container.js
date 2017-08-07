import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addHistoryFilter } from '../../history-actions';
import HistoryFilterForm from '../../../../components/filter/filter-forms/history-filter-form';
import './filter.css';

class FilterComponent extends React.Component {
  onSubmitClicked = filter => {
    console.log(filter);
    this.props.addHistoryFilter(filter);
  };

  data = {
    event: ['create', 'update', 'delete'],
    role: [
      'candidates',
      'cities',
      'hirings',
      'interviews',
      'skills',
      'users',
      'vacancies'
    ]
  };

  render() {
    return (
      <div className="filter-container">
        <HistoryFilterForm onSubmit={this.onSubmitClicked} data={this.data} />
      </div>
    );
  }
}

FilterComponent.propTypes = {
  form: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
  };
};
export default connect(mapStateToProps, { addHistoryFilter })(FilterComponent);
