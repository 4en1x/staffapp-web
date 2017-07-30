import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import Candidate from '../../../components/candidate-add-edit-forms/list/candidate';

///////////// for testing
const data = {
  contacts: {
    email: 'freeplayercot@gmail.com',
    phone: '+375293552746',
    skype: null,
    city: 'Minsk',
    linkedin: null,
    links: ['i dont no', 'i dont no but i', 'i dont no but i?']
  },
  skills: {
    primarySkill: 'PHP',
    primarySkillYearStart: '1998',
    englishLevel: 'A0',
    secondarySkills: ['NodeJS', 'MongoBD', 'Hadoop']
  },
  communication: {
    name: 'Kostya',
    surname: 'Stsefanovich',
    resume: null,
    lastChangeDate: '04/06/2009',
    salary: '5000$',
    status: 'pool',
    vacancy: 'c++ developer'
  }
};
const majorSkills = ['C++', 'Android', 'PHP', 'Python', 'iOS'];
const statuses = ['live', 'die', 'was born', 'pool'];
const minorSkills = ['Angular', 'ReactJS', 'NodeJS', 'MongoBD', 'Hadoop'];
const cities = ['Minsk', 'Pinsk', 'Dobrush', 'Borisov'];
/////////////////////////

const reducer = combineReducers({
  form: reduxFormReducer // mounted under "form"
});
const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer);

export default class CandidatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoaded: false };
  }

  componentDidMount() {
    this.setState({ isLoaded: true });
  }
  showResults = values => {
    window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  };
  render() {
    return (
      <Provider store={store}>
        <div className="candidate-page">
          {this.state.isLoaded
            ? <Candidate
                data={data}
                majorSkills={majorSkills}
                minorSkills={minorSkills}
                statuses={statuses}
                cities={cities}
                onSubmit={this.showResults}
              />
            : <p>not found</p>}
        </div>
      </Provider>
    );
  }
}
