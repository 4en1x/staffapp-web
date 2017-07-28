import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import Candidate from "../../components/add-edit-candidate-page/candidate";

///////////// for testing
const majorSkills = ["C++", "Android", "PHP", "Python", "iOS"];
const minorSkills = ["Angular", "ReactJS", "NodeJS", "MongoBD", "Hadoop"];
const statuses = ["live", "die", "was born", "pool"];
const cities = ["Minsk", "Pinsk", "Dobrush", "Borisov"];
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
