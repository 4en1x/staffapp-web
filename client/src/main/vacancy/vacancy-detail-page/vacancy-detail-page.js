import React from 'react';
import { connect } from 'react-redux';
import Vacancy from './components/vacancy';
import { getVacancyById } from '../vacancy-actions';
import SemanticLoader from '../../../components/loaders/semantic-loader';
import './vacancy-detail-page.css';

class VacancyPage extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getVacancyById(id);
  }

  render() {
    if (!this.props.vacancy) return <SemanticLoader />;

    return (
      <div className="vacancy-page">
        <Vacancy vacancy={this.props.vacancy} url={this.props.match.url}/>
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
