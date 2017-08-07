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

  nextData = () => {
    counter++;
    this.props.getVacancyList(this.props.filter, counter);
  };

  prevData = () => {
    if (counter > 1) {
      counter--;
      this.props.getVacancyList(this.props.filter, counter);
    }
  };
  componentWillUnmount() {
    this.props.resetCurrentVacancy();
    this.props.resetVacancyList();
  }

  render() {

    if (!this.props.vacancies) return <SemanticLoader />;

    return (
      <div>
        <ListComponent
          listItem={VacancyListItem}
          elements={this.props.vacancies}
          url={`/vacancies`}
        />
        <Button.Group size='large' floated="right">
            {counter === 1 && <Button onClick={this.prevData} disabled> previous page </Button>}
            {counter !== 1 && <Button onClick={this.prevData}> previous page </Button>}
          <Button.Or text={counter} />
          <Button primary onClick={this.nextData}> next page</Button>
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
