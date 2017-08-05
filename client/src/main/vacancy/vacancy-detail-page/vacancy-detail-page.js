import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Vacancy from './components/vacancy';
import {
  getVacancyById,
  resetVacancyList,
  deleteCurrentVacancy,
  resetDeletedVacancy
} from '../vacancy-actions';
import SemanticLoader from '../../../components/loaders/semantic-loader';
import './vacancy-detail-page.css';

class VacancyPage extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getVacancyById(id);
  }

  componentWillUnmount() {
    this.props.resetVacancysList();
    this.props.resetDeletedVacancy();
  }

  onDeletedVacancy = () => {
    console.log(this.props.vacancy.id);
    this.props.deleteCurrentVacancy(this.props.vacancy.id);
  };

  render() {

    if (this.props.isVacancyDeleted) return <Redirect to="/vacancies"/>;
    if (!this.props.vacancy) return <SemanticLoader />;

    return (
      <div className="vacancy-page">
        <Vacancy vacancy={this.props.vacancy} url={this.props.match.url} onDeletedVacancy={this.onDeletedVacancy}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    vacancy: state.vacancy.currentVacancy,
    isVacancyDeleted: state.vacancy.isVacancyDeleted
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getVacancyById: id => {
      dispatch(getVacancyById(id));
    },
    resetVacancysList: () => {
      dispatch(resetVacancyList());
    },
    deleteCurrentVacancy: id => {
      dispatch(deleteCurrentVacancy(id));
    },
    resetDeletedVacancy: () => {
      dispatch(resetDeletedVacancy());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VacancyPage);
