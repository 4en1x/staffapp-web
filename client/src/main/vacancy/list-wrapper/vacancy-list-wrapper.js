import React from 'react';
import { connect } from 'react-redux';
import { getVacancyList } from '../vacancy-actions';
import SemanticLoader from '../../../components/loaders/semantic-loader';
import ListComponent from '../../../components/list/list.component';
import VacancyListItem from '../../../components/list/list-items/vacancy-list-item';
// import './vacancy-list-wrapper.css';

class VacancyListWrapper extends React.Component {
  componentDidMount() {
    this.props.getVacancyList(this.props.filter);
  }

  componentWillReceiveProps(nextProps) {

    console.log(nextProps);

    if (this.props.filter !== nextProps.filter) {
      this.props.getVacancyList(nextProps.filter);
    }
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
  vacancies: state.vacancy.vacancyList,
  filter: state.vacancy.filter
});

export default connect(mapStateToProps, { getVacancyList })(VacancyListWrapper);