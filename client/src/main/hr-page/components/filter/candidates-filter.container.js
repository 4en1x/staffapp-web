import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addFilter, getFormValues } from '../../../candidate/candidate-actions';
import CandidatesFilterForm from '../../../../components/filter/filter-forms/candidates-filter-form';
import SemanticLoader from '../../../../components/loaders/semantic-loader';
import './filter.css';

class FilterComponent extends React.Component {
  componentDidMount() {
    this.props.getFormValues();
  }

  onSubmitClicked = filter => {
    this.props.addFilter(filter);
  };

  render() {
    console.log(this.props.formValues);

    if (!this.props.formValues) return <SemanticLoader />;

    return (
      <div className="filter-container">
        <CandidatesFilterForm
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
