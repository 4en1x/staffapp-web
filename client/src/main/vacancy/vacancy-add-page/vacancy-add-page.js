import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  getVacancyFormValues,
  postVacancy,
  resetVacancyList,
  resetForm
} from '../vacancy-actions';
import SemanticLoader from '../../../components/loaders/semantic-loader';
import VacancyComponent from '../../../components/vacancy-add-edit-forms/vacancy';

class AddVacancyPage extends React.Component {
  componentDidMount() {
    this.props.getVacancyFormValues();
  }

  showResults = values => {
    console.log(values);
    this.props.postVacancy(values);
  };

  componentWillUnmount() {
    this.props.resetVacancyList();
    this.props.resetForm();
  }

  render() {
    const lists = this.props.formValues;

    if (this.props.isFormSubmitted) return <Redirect to="/vacancies" />;

    return (
      <div className="page">
        {!this.props.formValues
          ? <SemanticLoader />
          : <VacancyComponent
              onSubmit={this.showResults}
              minorSkills={lists.secondarySkills}
              majorSkills={lists.primarySkills}
              cities={lists.cities}
              statuses={lists.statuses}
            />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    formValues: state.vacancy.formValues,
    isFormSubmitted: state.vacancy.isFormSubmitted
  };
};

export default connect(mapStateToProps, {
  getVacancyFormValues,
  postVacancy,
  resetVacancyList,
  resetForm
})(AddVacancyPage);
