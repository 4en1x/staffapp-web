import React from "react";
import ListComponent from "../../components/list/list.component";
import "./worker-page.css";
import { Route } from "react-router-dom";
import InterviewListItem from "../../components/list/list-items/interview-list-item";
import NavigationComponent from "../../components/navigation/navigation.component";

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

export default class WorkerPage extends React.Component {
  constructor(props) {
    super(props);
  }

  menuItemClickHandle = name => {
    //load interviews from server
    console.log(name);
  };

  componentDidMount() {
    // crate request for interviews
  }

  getItems = name => {
    //url (http://localhost/3000/name.toLowerCase());
  };

  //config object contains name of the tab in navigation menu and url for link
  navigationConfig = (url) => {
    return {
      interview: {
        name: 'Interview',
        url: `${url}/interviews`
      }
    }
  };


  render() {
    let url = this.props.match.url;
    let config = this.navigationConfig(url);

    return (
      <div className="worker-page">
        <NavigationComponent config={config} activeItem="Interview" />
        <div className="content">
          <Route
            exact
            path={`${url}`}
            component={() =>
              <ListComponent
                listItem={InterviewListItem}
                elements={interviews}
              />}
          />
          <Route
            path={`${url}/interviews`}
            component={() =>
              <ListComponent
                listItem={InterviewListItem}
                elements={interviews}
              />}
          />
        </div>
      </div>
    );
  }
}
