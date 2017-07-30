import React from 'react';
import { connect } from 'react-redux';
import Vacancy from './components/vacancy';
import { getVacancyById } from './vacancy-actions';
import './vacancy-page.css';

class VacancyPage extends React.Component {
  componentDidMount() {
    const id = this.props.match.url;
    this.props.getVacancyById(id);
  }

  render() {
    if (!this.props.vacancy) return <p>Is Loading</p>;

    return (
      <div className="vacancy-page">
        <Vacancy vacancy={this.props.vacancy} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    vacancy: state.vacancy.currentVacancy
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getVacancyById: id => {
      dispatch(getVacancyById(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VacancyPage);
