import React from "react";
import VacancyComponent from "../../components/add-edit-vacancy-page/vacancy";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import { Redirect } from "react-router-dom";

const minorSkills = [
  {
    name: "js",
    weight: 2
  },
  {
    name: "java",
    weight: 2
  },
  {
    name: "c++",
    weight: 2
  },
  {
    name: "html",
    weight: 2
  }
];
const majorSkills = ["Angular", "ReactJS", "NodeJS", "MongoBD", "Hadoop"];
const cities = ["pinsk", "minsk", "dobrush", "borisov"];
const statuses = ["on hold", "die", "live", "was born"];
const data = {
  id: "1"
};
const reducer = combineReducers({
  form: reduxFormReducer // mounted under "form"
});
const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer);

export default class VacancyPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false
    };
  }
  componentDidMount() {
    this.setState({ isLoaded: true });
  }

  showResults = values => {
    window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  };

  render() {
    // const url = this.props.match.url;
    // if (this.state.feedbackClicked) return <Redirect to={`${url}/feedback`} />;
    return (
      <Provider store={store}>
        <div className="vacancy-page">
          {!this.state.isLoaded
            ? <p>Not Loaded</p>
            : <VacancyComponent
                onSubmit={this.showResults}
                minorSkills={minorSkills}
                majorSkills={majorSkills}
                cities={cities}
                statuses={statuses}
                data={data}
              />}
        </div>
      </Provider>
    );
  }
}
