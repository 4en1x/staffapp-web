import React from "react";
import InterviewComponent from "../../components/add-edit-interview-page/interview.component";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import { Redirect } from "react-router-dom";

import "./interview-page.css";

const cities = ["Minsk", "Pinsk", "Dobrush", "Borisov"];
const data = {
  place: "Pinsk",
  type: "tech",
  fields: [
    {
      name: "primaryOne",
      type: "tech",
      typeSkill: "primary"
    },
    {
      name: "secondaryOne",
      type: "tech",
      typeSkill: "secondary"
    },
    {
      name: "secondaryTwo",
      type: "tech",
      typeSkill: "secondary"
    },
    {
      name: "otherOne",
      type: "tech",
      typeSkill: "other"
    },
    {
      name: "otherTwo",
      type: "tech",
      typeSkill: "other"
    }
  ],
  users: ["2", "4"]
};

const reducer = combineReducers({
  form: reduxFormReducer // mounted under "form"
});
const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer);

export default class InterviewPage extends React.Component {
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
        <div className="interview-page">
          {!this.state.isLoaded
            ? <p>Not Loaded</p>
            : <InterviewComponent
                onSubmit={this.showResults}
                cities={cities}
                data={data}
              />}
        </div>
      </Provider>
    );
  }
}
