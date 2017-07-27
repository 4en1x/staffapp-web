import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import ListComponent from "../../components/list/list.component";
import SecondaryMenuComponent from "../../components/secondary-menu/secondary-menu.component";
import HRNavigationBar from "../../components/hr-navigation-bar/navigation-bar";
import InterviewListItem from "../../components/list/list-items/interview-list-item";
import CandidatesListItem from "../../components/list/list-items/candidate-list-item";
import VacancyListItem from "../../components/list/list-items/vacancy-list-item";
import "./hr-page.css";

// default data for mock's
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
const candidates = [
  {
    id: "1",
    data: "01.01.01",
    name: "Sergey",
    status: "Free",
    technology: "JavaScript",
    city: "Minsk",
    time: "21 00"
  },

  {
    id: "2",
    data: "01.01.01",
    name: "Anton",
    status: "Free",
    technology: "JavaScript",
    city: "Minsk",
    time: "21 00"
  },

  {
    id: "3",
    data: "01.01.01",
    name: "Igor",
    status: "Free",
    technology: "JavaScript",
    city: "Minsk",
    time: "21 00"
  }
];
const vacancies = [
  {
    id: "1",
    name: "Sergey",
    status: "Free",
    primarySkill: "JavaScript",
    location: "Minsk",
    dateStart: "01.01.01"
  },

  {
    id: "2",
    name: "Anton",
    status: "Free",
    primarySkill: "JavaScript",
    location: "Minsk",
    dateStart: "01.01.01"
  },

  {
    id: "3",
    name: "Igor",
    status: "Free",
    primarySkill: "JavaScript",
    location: "Minsk",
    dateStart: "01.01.01"
  }
];

export default class HRPage extends React.Component {
  render() {
    const url = "/";

    return (
      <div className="hr-page">
        <HRNavigationBar url={url} activeItem="Interviews" />
        <div className="hr-page_content">
          <Route
            exact
            path={`${url}`}
            component={() =>
              <ListComponent
                listItem={InterviewListItem}
                elements={interviews}
                url={`${url}interviews`}
              />}
          />
          <Route
            path={`${url}interviews`}
            component={() =>
              <ListComponent
                listItem={InterviewListItem}
                elements={interviews}
                url={`${url}interviews`}
              />}
          />
          <Route
            path={`${url}vacancies`}
            component={() =>
              <ListComponent
                listItem={VacancyListItem}
                elements={vacancies}
                url={`${url}vacancies`}
              />}
          />
          <Route
            path={`${url}candidates`}
            component={() =>
              <ListComponent
                listItem={CandidatesListItem}
                elements={candidates}
                url={`${url}candidates`}
              />}
          />
          <SecondaryMenuComponent />
        </div>
      </div>
    );
  }
}
