import React from 'react';
import Candidate from '../../../components/candidate-add-edit-forms/list/candidate';
import candidateService from '../../../service/candidate-service';
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

export default class AddCandidatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoaded: false };
  }

  componentDidMount() {

    // candidateService.getCandidatesFillList().then(res => {
    //   this.lists = res.data;
    //   this.setState({ isLoaded: true });
    // });

      ///////////////////////////////////temp///////
      this.lists = {
          secondarySkills: ["js", "java", "html", "c++"],
          primarySkills: ["Angular", "ReactJS", "NodeJS", "MongoBD", "Hadoop"],
          cities: ["pinsk", "minsk", "dobrush", "borisov"],
          statuses: ["on hold", "die", "live", "was born"]
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
