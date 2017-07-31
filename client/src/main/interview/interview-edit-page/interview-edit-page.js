import React from 'react';
import InterviewComponent from '../../../components/interview-add-edit-forms/interview.component';
import interviewService from '../../../service/interview-service';
import './interview-edit-page.css';
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



export default class EditInterviewPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false
    };
  }
  componentDidMount() {

    // interviewService.getEditFormById(this.props.match.params.id).then(res => {
    //   this.interview = res.data;
    //   interviewService.getInterviewFillList().then(res => {
    //     this.lists = res.data;
    //     this.setState({ isLoaded: true });
    //   });
    // });

      ///////////////////////////////////temp///////
      this.skillsList = {
          primary: ["primaryOne"],
          secondary: ["secondaryOne", "secondaryTwo", "secondaryThree"],
          other: ["otherOne", "otherTwo", "otherThree"],
          hr: ["something1", "something2", "something3"]
      }
      this.candidate={};
      this.candidate["data"] = {
          place: 'Pinsk',
          date: "2017-02-03"
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
      <div className="edit-interview-page">
        {!this.state.isLoaded
          ? <p>Not Loaded</p>
          : <InterviewComponent
              onSubmit={this.showResults}
              data={this.candidate.data}
              skillsList={this.skillsList}
            />}
      </div>
        </Provider>
    );
  }
}
