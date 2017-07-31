import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getVacancyFillList, patchVacancy } from '../vacancy-actions';
import VacancyComponent from '../../../components/vacancy-add-edit-forms/vacancy';

class EditVacancyPage extends React.Component {
  componentDidMount() {
    this.props.getVacancyFillList();
  }

  showResults = values => {
    delete values.jobStart;
    this.props.patchVacancy(this.props.match.params.id, values);
  };

  componentWillReceiveProps() {
    window.alert('asdfsadfa');
  }

  render() {
    if (this.props.isEditFormSubmitted) {
      return <Redirect to={`/vacancies/${this.props.match.params.id}`} />;
    }

    const lists = this.props.formValues;

    return (
      <div className="edit-vacancy-page">
        {!this.props.isFormLoaded
          ? <p>Not Loaded</p>
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
    isFormLoaded: state.vacancy.isFormLoaded,
    formValues: state.vacancy.formValues,
    isEditFormSubmitted: state.vacancy.isEditFormSubmitted
  };
};

export default connect(mapStateToProps, {
  getVacancyFillList,
  patchVacancy
})(EditVacancyPage);
