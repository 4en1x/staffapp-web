import React from 'react';
import HeaderComponent from '../../components/header/header.components';
import ListComponent from '../../components/list/list.component';
import MenuComponent from '../../components/menu/menu.component';
import './worker-page.css';

const interviews = [
  {
    id: '111',
    name: "Sergey",
    surname: "Moiseyenko",
    date: "08.08.08",
    time: "21 00",
    location: "Minsk, Belarus",
    primary_skill: "Javascrtipt"
  },
  {
    id: '222',
    name: "Evg",
    surname: "Basaranovich",
    date: "08.08.08",
    time: "21 00",
    location: "Minsk, Belarus",
    primary_skill: "Javascrtipt"
  },
  {
    id: '333',
    name: "Kosty",
    surname: "Basaranovich",
    date: "08.08.08",
    time: "21 00",
    location: "Minsk, Belarus",
    primary_skill: "Javascrtipt"
  },
  {
    id: '444',
    name: "Evg",
    surname: "Basaranovich",
    date: "08.08.08",
    time: "21 00",
    location: "Minsk, Belarus",
    primary_skill: "Javascrtipt"
  },
  {
    id: '555',
    name: "Lenya",
    surname: "Basaranovich",
    date: "08.08.08",
    time: "21 00",
    location: "Minsk, Belarus",
    primary_skill: "Javascrtipt"
  },
  {
    id: '666',
    name: "Nik",
    surname: "Basaranovich",
    date: "08.08.08",
    time: "21 00",
    location: "Minsk, Belarus",
    primary_skill: "Javascrtipt"
  },
  {
    id: '777',
    name: "Evg",
    surname: "Basaranovich",
    date: "08.08.08",
    time: "21 00",
    location: "Minsk, Belarus",
    primary_skill: "Javascrtipt"
  }
];

const user = {
  name: 'Sergey',
  surname: 'Moiseyenko'
};

export default class WorkerPage extends React.Component {

  constructor(props) {
    super(props);
  }

  menuItemClickHandle = (name) => {

    //load interviews from server
    console.log(name);
  };

  componentDidMount() {
    // crate request for interviews
  }

  getItems = (name) => {
    //url (http://localhost/3000/name.toLowerCase());
  };

  render() {

    return (
      <div className="worker-page">
        <HeaderComponent user={user}/>
        <div className="content">
          <MenuComponent className="menu-component" items={['Interviews']} menuItemClickHandle={this.menuItemClickHandle}/>
          <ListComponent interviews={interviews}/>
        </div>
      </div>
    )
  }
}
