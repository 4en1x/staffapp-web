import React from "react";
import ListComponent from "../../components/list/list.component";
import "./worker-page.css";
import { Route, Redirect } from "react-router-dom";
import InterviewListItem from "../../components/list/list-items/interview-list-item";
import WorkerNavigationBar from "../../components/worker-navigation-bar/navigation-bar";
import { addInterviewsList } from "../../action-creators/action-creators.js";
import { getInterviewList } from "../../action-creators/action-creators.js";
import SemanticLoader from "../../components/loaders/semantic-loader.js";
import * as actionCreators from "../../action-creators/action-creators.js";
import { connect } from "react-redux";
import axios from "axios";

class WorkerPage extends React.Component {
  componentDidMount() {
    this.props.getInterviewList();
  }

  render() {
    const url = this.props.match.url;
    if (!this.props.interviews) return <SemanticLoader />;

    return (
      <div className="worker-page">
        <WorkerNavigationBar url={url} activeItem="Interview" />
        <div className="worker-page_content">
          <Route
            exact
            path={`${url}`}
            component={() =>
              <ListComponent
                listItem={InterviewListItem}
                elements={this.props.interviews}
                url={`${url}interviews`}
              />}
          />
          <Route
            path={`${url}interviews`}
            component={() =>
              <ListComponent
                listItem={InterviewListItem}
                elements={this.props.interviews}
                url={`${url}interviews`}
              />}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  interviews: state.interview.interviewList
});

export default connect(mapStateToProps, actionCreators)(WorkerPage);
