import React from "react";
import InterviewComponent from "./components/interview.component";
import { Redirect } from "react-router-dom";
import { getInterviewById } from "../../action-creators/action-creators.js";
import { connect } from "react-redux";
import SemanticLoader from "../../components/loaders/semantic-loader.js";
import * as actionCreators from "../../action-creators/action-creators.js";
import "./interview-page.css";

class InterviewPage extends React.Component {
  componentDidMount() {
    const id = this.props.match.url;
    this.props.getInterviewById(id);
  }

  render() {
    const url = this.props.match.url;
    return (
      <div className="interview-page">
        {!this.props.interview
          ? <SemanticLoader />
          : <InterviewComponent
              interview={this.props.interview}
              feedbackClicked={this.feedbackClicked}
              url={url}
            />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  interview: state.interview.currentInterview
});

export default connect(mapStateToProps, actionCreators)(InterviewPage);
