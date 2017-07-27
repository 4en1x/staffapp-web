import React from 'react';
import { connect } from 'react-redux';
import { getVacancyList } from '../../vacany-detail-page/vacancy-actions';
import SemanticLoader from '../../../components/loaders/semantic-loader';
import ListComponent from '../../../components/list/list.component';
import VacancyListItem from '../../../components/list/list-items/vacancy-list-item';
import './list-wrapper.css';

class VacancyListWrapper extends React.Component {
  componentDidMount() {
    this.props.getVacancyList();
  }

  render() {
    if (!this.props.vacancies) return <SemanticLoader />;

    return (
      <ListComponent
        listItem={VacancyListItem}
        elements={this.props.vacancies}
        url={`/vacancies`}
      />
    );
  }
}

const mapStateToProps = state => ({
  vacancies: state.vacancy.vacancyList
});

export default connect(mapStateToProps, { getVacancyList })(VacancyListWrapper);
