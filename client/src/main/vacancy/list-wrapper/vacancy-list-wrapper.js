import React from 'react';
import { connect } from 'react-redux';
import {
  getVacancyList,
  resetVacancyList,
  resetCurrentVacancy
} from '../vacancy-actions';
import SemanticLoader from '../../../components/loaders/semantic-loader';
import ListComponent from '../../../components/list/list.component';
import VacancyListItem from '../../../components/list/list-items/vacancy-list-item';
import './vacancy-list-wrapper.css';
import { Button } from 'semantic-ui-react';

let counter = 1;
class VacancyListWrapper extends React.Component {
  componentDidMount() {
    this.props.getVacancyList(this.props.filter, 1);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.filter !== nextProps.filter) {
      this.props.getVacancyList(nextProps.filter, 1);
    }
  }

  componentWillUnmount() {
    this.props.resetCurrentVacancy();
    this.props.resetVacancyList();
  }

  render() {

    if (!this.props.vacancies.data) return <SemanticLoader />;
    return (
      <div>
        <ListComponent
          listItem={VacancyListItem}
          elements={this.props.vacancies.data}
          url={`/vacancies`}
        />
        <Button.Group size="large" floated="right">
            {counter === 1 && <Button disabled content="previous page" />}
            {counter !== 1 &&
            <Button
                onClick={this.props.getVacancyList(
                    this.props.filter,
                    --counter
                )}
                content="previous page"
            />}
          <Button.Or text={counter} />
            {counter === this.props.vacancies.pagesAmount / 10 &&
            <Button primary disabled content="next page" />}
            {counter !== 1 &&
            <Button
                primary
                onClick={this.props.getVacancyList(
                    this.props.filter,
                    ++counter
                )}
                content="next page"
            />}
        </Button.Group>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  vacancies: state.vacancy.vacancyList,
  filter: state.vacancy.filter
});

export default connect(mapStateToProps, {
  getVacancyList,
  resetVacancyList,
  resetCurrentVacancy
})(VacancyListWrapper);
