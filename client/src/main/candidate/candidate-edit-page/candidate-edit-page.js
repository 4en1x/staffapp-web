import React from 'react';
import Candidate from '../../../components/candidate-add-edit-forms/list/candidate';
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";

/////////////////////////////////////////////////////////////
const reducer = combineReducers({
    form: reduxFormReducer // mounted under "form"
});
const store = (window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore)(reducer);
/////////////////////////////////////////////////////////////


export default class CandidatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoaded: false };
  }

    componentDidMount() {
        // vacancyService.getVacancyById(this.props.match.params.id).then(res => {
        //   this.vacancy = res.data;
        //   vacancyService.getVacancyFillList().then(res => {
        //     this.lists = res.data;
        //     console.log(this.lists);
        //     this.setState({ isLoaded: true });
        //   });
        // });

        ///////////////////////////////////temp///////
        this.lists = {
            secondarySkills: ["js", "java", "html", "c++"],
            primarySkills: ["Angular", "ReactJS", "NodeJS", "MongoBD", "Hadoop"],
            cities: ["pinsk", "minsk", "dobrush", "borisov"],
            statuses: ["on hold", "die", "live", "was born"]
        };
        this.candidate ={};
        this.candidate["data"]= {
            contacts: {
                email: 'freeplayercot@gmail.com',
                phone: '+375293552746',
                skype: null,
                city: 'minsk',
                linkedin: null,
                links: ['i dont no', 'i dont no but i', 'i dont no but i?']
            },
            skills: {
                primarySkill: 'Angular',
                primarySkillYearStart: '1998',
                englishLevel: 'A0',
                secondarySkills: ["js", "java", "html"]
            },
            communication: {
                name: 'Kostya',
                surname: 'Stsefanovich',
                resume: "resume",
                lastChangeDate: '04/06/2009',
                salary: '5000',
                status: 'on hold',
                vacancy: 'c++ developer'
            }
        };
        this.setState({ isLoaded: true });
        ///////////////////////////////////////////////
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
                data={this.candidate.data}
                majorSkills={this.lists.primarySkills}
                minorSkills={this.lists.secondarySkills}
                statuses={this.lists.statuses}
                cities={this.lists.cities}
                onSubmit={this.showResults}
              />
            : <p>not found</p>}
        </div>
      </Provider>
    );
  }
}
