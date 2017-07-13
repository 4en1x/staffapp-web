import React from "react";
import HeaderComponent from "../../components/header/header.components";
import ListComponent from "../../components/list/list.component";
import MenuComponent from "../../components/menu/menu.component";
import SecondaryMenuComponent from "../../components/secondary-menu/secondary-menu.component";
import "./hr-page.css";

const interviews = [
  {
    id: "111",
    name: "Sergey",
    surname: "Moiseyenko",
    date: "08.08.08",
    time: "21 00",
    location: "Minsk, Belarus",
    primary_skill: "Javascrtipt"
  },
  {
    id: "222",
    name: "Evg",
    surname: "Basaranovich",
    date: "08.08.08",
    time: "21 00",
    location: "Minsk, Belarus",
    primary_skill: "Javascrtipt"
  },
  {
    id: "333",
    name: "Kosty",
    surname: "Basaranovich",
    date: "08.08.08",
    time: "21 00",
    location: "Minsk, Belarus",
    primary_skill: "Javascrtipt"
  },
  {
    id: "444",
    name: "Evg",
    surname: "Basaranovich",
    date: "08.08.08",
    time: "21 00",
    location: "Minsk, Belarus",
    primary_skill: "Javascrtipt"
  },
  {
    id: "555",
    name: "Lenya",
    surname: "Basaranovich",
    date: "08.08.08",
    time: "21 00",
    location: "Minsk, Belarus",
    primary_skill: "Javascrtipt"
  },
  {
    id: "666",
    name: "Nik",
    surname: "Basaranovich",
    date: "08.08.08",
    time: "21 00",
    location: "Minsk, Belarus",
    primary_skill: "Javascrtipt"
  },
  {
    id: "777",
    name: "Evg",
    surname: "Basaranovich",
    date: "08.08.08",
    time: "21 00",
    location: "Minsk, Belarus",
    primary_skill: "Javascrtipt"
  }
];

const user = {
  name: "Sergey",
  surname: "Moiseyenko"
};

export default class HRPage extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="hr-page">
        <HeaderComponent user={user} />
        <div className="hr-page_content">
          <MenuComponent
            className="hr-page_menu"
            items={["Interviews"]}
            menuItemClickHandle={this.menuItemClickHandle}
          />
          <div className="hr-page_content-description">
            <ListComponent interviews={interviews} />
            <SecondaryMenuComponent />
          </div>
        </div>
      </div>
    );
  }
}
