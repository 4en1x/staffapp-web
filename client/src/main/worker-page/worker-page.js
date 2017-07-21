import React from "react";
import ListComponent from "../../components/list/list.component";
import "./worker-page.css";
import { Route, Redirect } from "react-router-dom";
import InterviewListItem from "../../components/list/list-items/interview-list-item";
import WorkerNavigationBar from "../../components/worker-navigation-bar/navigation-bar";
import {addInterviewsList} from '../../action-creators/action-creators.js';
import { getInterviewList } from '../../action-creators/action-creators.js';
import SemanticLoader from '../../components/loaders/semantic-loader.js';
import { connect } from 'react-redux';
import axios from 'axios';

const interviews = [
  {
    id: "111",
    name: "Sergey",
    surname: "Moiseyenko",
    date: "08.08.08",
    time: "21 00",
    location: "Minsk, Belarus",
    primarySkill: "Javascrtipt"
  },
  {
    id: "222",
    name: "Evg",
    surname: "Basaranovich",
    date: "08.08.08",
    time: "21 00",
    location: "Minsk, Belarus",
    primarySkill: "Javascrtipt"
  },
  {
    id: "333",
    name: "Kosty",
    surname: "Basaranovich",
    date: "08.08.08",
    time: "21 00",
    location: "Minsk, Belarus",
    primarySkill: "Javascrtipt"
  },
  {
    id: "444",
    name: "Evg",
    surname: "Basaranovich",
    date: "08.08.08",
    time: "21 00",
    location: "Minsk, Belarus",
    primarySkill: "Javascrtipt"
  },
  {
    id: "555",
    name: "Lenya",
    surname: "Basaranovich",
    date: "08.08.08",
    time: "21 00",
    location: "Minsk, Belarus",
    primarySkill: "Javascrtipt"
  },
  {
    id: "666",
    name: "Nik",
    surname: "Basaranovich",
    date: "08.08.08",
    time: "21 00",
    location: "Minsk, Belarus",
    primarySkill: "Javascrtipt"
  },
  {
    id: "777",
    name: "Evg",
    surname: "Basaranovich",
    date: "08.08.08",
    time: "21 00",
    location: "Minsk, Belarus",
    primarySkill: "Javascrtipt"
  }
];

class WorkerPage extends React.Component {

  componentDidMount() {
    this.props.addInterviewsList();
    // crate request for interview;
  }

  render() {
    const url = this.props.match.url;
    // <Route exact path='/' render={() => (<Redirect to='/interviews' />)} />
    if (!this.props.interviews) return <SemanticLoader/>

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

const mapStateToProps = (state) => {
  return {
    interviews: state.interview.interviewList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addInterviewsList: () => {
      dispatch(getInterviewList());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkerPage);
