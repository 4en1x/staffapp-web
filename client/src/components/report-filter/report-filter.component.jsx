import React from "react";
import { Menu, Input, Dropdown } from "semantic-ui-react";
import "../secondary-menu/secondary-menu.css";

const primarySkills = [
  ".NET",
  "C++",
  "DBE",
  "Java",
  "HTML/CSS",
  "JavaScript",
  "PHP",
  "Ruby on Rails",
  "Python"
].map(item => ({
  key: item,
  value: item,
  text: item
}));
const statusesVacancy = ["Pool ", "In progress", "Hired"].map(item => ({
  key: item,
  value: item,
  text: item
}));
const statusesCandidate = [
  "Pool ",
  "In progress",
  "Hired",
  "On hold",
  "Rejected",
  "Interview",
  "Interview with customer",
  "Job offer",
  "Job offer rejected",
  "Job offer accepted",
  "Attention"
].map(item => ({
  key: item,
  value: item,
  text: item
}));

export default class InterviewsFilterComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      primarySkill: "",
      statusCandidate: "",
      statusVacancy: "",
      city: "",
      date: null
    };
  }

  saveSearchKey = (e, { typeData, value }) => {
    this.setState({ [typeData]: value });
  };

  render() {
    return (
      <Menu secondary vertical className="custom">
        <Menu.Item>
          <Input
            focus
            placeholder="Input candidate name"
            typeData="name"
            onChange={this.saveSearchKey}
          />
        </Menu.Item>

        <Menu.Item>
          <Dropdown
            placeholder="choose technology"
            selection
            options={primarySkills}
            typeData="primarySkill"
            onChange={this.saveSearchKey}
          />
        </Menu.Item>

        <Menu.Item>
          <Dropdown
            placeholder="choose vacancy status"
            selection
            options={statusesVacancy}
            typeData="statusVacancy"
            onChange={this.saveSearchKey}
          />
        </Menu.Item>

        <Menu.Item>
          <Dropdown
            placeholder="choose candidate status"
            selection
            options={statusesCandidate}
            typeData="statusCandidate"
            onChange={this.saveSearchKey}
          />
        </Menu.Item>

        <Menu.Item>
          <Input
            focus
            placeholder="Input city"
            typeData="city"
            onChange={this.saveSearchKey}
          />
        </Menu.Item>

        <Menu.Item>
          <Input
            focus
            placeholder="Input date"
            onChange={this.saveSearchKey}
            type="date"
            typeData="date"
          />
        </Menu.Item>
      </Menu>
    );
  }
}
