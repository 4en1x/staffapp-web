import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Vacancy from './components/vacancy';
import * as actionCreators from '../vacancy-actions';
import SemanticLoader from '../../../components/loaders/semantic-loader';
import './vacancy-detail-page.css';

class VacancyPage extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getVacancyById(id);
  }

  componentWillUnmount() {
    this.props.resetVacancyList();
    this.props.resetDeletedVacancy();
  }

  onDeletedVacancy = () => {
    this.props.deleteCurrentVacancy(this.props.vacancy.id);
  };

  render() {

    console.log(this.props.isVacancyDeleted);

    if (this.props.isVacancyDeleted) return <Redirect to="/vacancies" />;
    if (!this.props.vacancy) return <SemanticLoader />;

    return (
      <div className="vacancy-page">
        {!this.props.vacancy
          ? <SemanticLoader />
          : <Vacancy
              vacancy={this.props.vacancy}
              url={this.props.match.url}
              onDeletedVacancy={this.onDeletedVacancy}
              role={this.props.role}
            />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    vacancy: state.vacancy.currentVacancy,
    isVacancyDeleted: state.vacancy.isVacancyDeleted,
    role: state.auth.role
  };
};

export default connect(mapStateToProps, actionCreators)(VacancyPage);
