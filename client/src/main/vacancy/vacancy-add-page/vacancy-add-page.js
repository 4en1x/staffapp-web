import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getVacancyFillList, postVacancy, resetVacancyList} from '../vacancy-actions';
import SemanticLoader from '../../../components/loaders/semantic-loader';
import VacancyComponent from '../../../components/vacancy-add-edit-forms/vacancy';

class AddVacancyPage extends React.Component {
  componentDidMount() {
    this.props.getVacancyFillList();
  }

  showResults = values => {
    this.props.postVacancy(values);
  };

  componentWillUnmount() {
    this.props.resetVacancyList();
  }

  render() {
    const lists = this.props.formValues;

    if (this.props.isAddFormSubmitted) return <Redirect to="/vacancies" />;

    return (
      <div className="vacancy-page">
        {!this.props.isFormLoaded
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
    isFormLoaded: state.interview.isFormLoaded,
    formValues: state.interview.formValues,
    isAddFormSubmitted: state.interview.isAddFormSubmitted
  };
};

export default connect(mapStateToProps, { getVacancyFillList, postVacancy, resetVacancyList })(
  AddVacancyPage
);
