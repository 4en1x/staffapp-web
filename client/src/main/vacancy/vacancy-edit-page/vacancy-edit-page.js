import React from "react";
import VacancyComponent from "../../../components/vacancy-add-edit-forms/vacancy";
import vacancyService from "../../../service/vacancy-service";
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



export default class InterviewPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false
    };
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
    this.vacancy = {
      id: 1,
      name: "job in exadel",
      status: "on hold",
      jobStart: "2009-04-02",
      salary: "5000",
      primarySkill: "ReactJS",
      description: "description 1",
      city: "minsk",
      skills: ["js", "java", "html"]
    };
    this.setState({ isLoaded: true });
    ///////////////////////////////////////////////
  }

  showResults = values => {
    window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  };

  render() {
    // const url = this.props.match.url;
    // if (this.state.feedbackClicked) return <Redirect to={`${url}/feedback`} />;
    return (
      <Provider store={store}>
        <div className="edit-vacancy-page">
          {!this.state.isLoaded
            ? <p>Not Loaded</p>
            : <VacancyComponent
                onSubmit={this.showResults}
                minorSkills={this.lists.secondarySkills}
                majorSkills={this.lists.primarySkills}
                data={this.vacancy}
                cities={this.lists.cities}
                statuses={this.lists.statuses}
              />}
        </div>
      </Provider>
    );
  }
}
