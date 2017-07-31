import React from "react";
import InterviewComponent from "../../../components/interview-add-edit-forms/interview.component";
import interviewService from "../../../service/interview-service";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";

import "./interview-add-page.css";




/////////////////////////////////////////////////////////////
const reducer = combineReducers({
    form: reduxFormReducer // mounted under "form"
});
const store = (window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore)(reducer);
/////////////////////////////////////////////////////////////




export default class ADDInterviewPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false
    };
  }

  componentDidMount() {
    interviewService.getInterviewFillList().then(res => {
      console.log(res);
      this.skillsList = res.data;
      this.setState({ isLoaded: true });
    });

    ///////////////////////////////////temp///////
      this.skillsList = {
          primary: ["primaryOne"],
          secondary: ["secondaryOne", "secondaryTwo", "secondaryThree"],
          other: ["otherOne", "otherTwo", "otherThree"],
          hr: ["something1", "something2", "something3"]
      }
      this.setState({ isLoaded: true });
    ///////////////////////////////////////////////
  }

  showResults = values => {
    console.log(values);
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
              skillsList={this.skillsList}
            />}
      </div>
        </Provider>
    );
  }
}
