import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FileDownload from 'react-file-download';
import { addFilter, getFormValues } from '../../../candidate/candidate-actions';
import CandidatesFilterForm from '../../../../components/filter/filter-forms/candidates-filter-form';
import SemanticLoader from '../../../../components/loaders/semantic-loader';
import candidateService from '../../../../service/candidate-service';
import './filter.css';

class FilterComponent extends React.Component {
  componentDidMount() {
    this.props.getFormValues();
  }

  onSubmitClicked = filter => {
    this.props.addFilter(filter);
  };

  onReportClicked = () => {
    candidateService.getCandidatesReport(this.props.filter).then(res => {
      FileDownload(res.data, 'report.csv');
    });
  };

  render() {
    console.log(this.props.formValues);

    if (!this.props.formValues) return <SemanticLoader />;

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

FilterComponent.propTypes = {
  form: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    formValues: state.candidate.formValues
  };
};

export default connect(mapStateToProps, { addFilter, getFormValues })(
  FilterComponent
);
