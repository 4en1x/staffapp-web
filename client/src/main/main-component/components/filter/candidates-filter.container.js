import React from 'react';
import { connect } from 'react-redux';
import {
  addFilter,
  getFormValues,
  downloadReport
} from '../../../candidate/candidate-actions';
import CandidatesFilterForm from '../../../../components/filter/filter-forms/candidates-filter-form';
import './filter.css';

class FilterComponent extends React.Component {
  componentDidMount() {
    this.props.getFormValues();
  }

  onSubmitClicked = filter => {
    console.log(filter);
    this.props.addFilter(filter);
  };

  onReportClicked = () => {
    const filter = JSON.stringify(this.props.filter || {});
    this.props.downloadReport(`http://localhost:3300/candidates/report?filter=${filter}`);
  };

  render() {
    return (
      <div className="filter-container">
        <CandidatesFilterForm
          onReportClicked={this.onReportClicked}
          onSubmit={this.onSubmitClicked}
          data={this.props.formValues}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    formValues: state.candidate.formValues || {},
    filter: state.candidate.filter
  };
};

export default connect(mapStateToProps, {
  addFilter,
  getFormValues,
  downloadReport,
})(FilterComponent);
