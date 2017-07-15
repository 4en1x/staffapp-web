import React from "react";
import ListComponent from "../../components/list/list.component";
import SecondaryMenuComponent from "../../components/secondary-menu/secondary-menu.component";
import NavigationComponent from "../../components/navigation/navigation.component";
import InterviewListItem from "../../components/list/list-items/interview-list-item";
import CandidatesListItem from "../../components/list/list-items/candidate-list-item";
import VacancyListItem from "../../components/list/list-items/vacancy-list-item";
import { Route } from "react-router-dom";
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

//config for navigation bar (navigation bar give you more flex and you just config navi bar)
const config = {
  interview: {
    name: "Interviews",
    url: "interviews"
  },

  candidate: {
    name: "Candidates",
    url: "candidates"
  },

  vacancy: {
    name: "Vacancies",
    url: "vacancies"
  },

  history: {
    name: "History",
    url: "history"
  }
};

export default class HRPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const url = this.props.match.url;

    return (
      <div className="hr-page">
        <NavigationComponent config={config} activeItem="Interviews" />
        <div className="hr-page_content">
          <Route
            path={`${url}/interviews`}
            component={() =>
              <ListComponent
                listItem={InterviewListItem}
                elements={interviews}
              />}
          />
          <Route
            path={`${url}/vacancies`}
            component={() =>
              <ListComponent listItem={VacancyListItem} elements={vacancies} />}
          />
          <Route
            path={`${url}/candidates`}
            component={() =>
              <ListComponent
                listItem={CandidatesListItem}
                elements={candidates}
              />}
          />
          <SecondaryMenuComponent />
        </div>
      </div>
    );
  }
}
