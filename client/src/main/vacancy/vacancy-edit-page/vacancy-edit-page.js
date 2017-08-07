import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  getVacancyFormValues,
  patchVacancy,
  resetCurrentVacancy,
  resetForm
} from '../vacancy-actions';
import VacancyComponent from '../../../components/vacancy-add-edit-forms/vacancy';
import SemanticLoader from '../../../components/loaders/semantic-loader';

class EditVacancyPage extends React.Component {
  componentDidMount() {
    this.props.getVacancyFormValues();
  }

  showResults = values => {
    delete values.jobStart;
    this.props.patchVacancy(this.props.match.params.id, values);
  };

  componentWillUnmount() {
    this.props.resetCurrentVacancy();
    this.props.resetForm();
  }

  render() {

    if (this.props.isFormSubmitted) {
      return <Redirect to={`/vacancies/${this.props.match.params.id}`} />;
    }

    const lists = this.props.formValues;

    return (
      <div className="edit-vacancy-page">
        {!this.props.formValues
          ? <SemanticLoader />
          : <VacancyComponent
              onSubmit={this.showResults}
              minorSkills={lists.secondarySkills}
              majorSkills={lists.primarySkills}
              data={this.props.vacancy}
              cities={lists.cities}
              statuses={lists.statuses}
            />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    vacancy: state.vacancy.currentVacancy,
    formValues: state.vacancy.formValues,
    isFormSubmitted: state.vacancy.isFormSubmitted
  };
};

export default connect(mapStateToProps, {
  getVacancyFormValues,
  patchVacancy,
  resetCurrentVacancy,
  resetForm
})(EditVacancyPage);
