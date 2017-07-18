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
      shows: [false, false, false, false, false, false],
      name: "",
      primarySkill: "",
      statusCandidate: "",
      statusVacancy: "",
      city: "",
      date: null
    };
  }

  handleChange = (e, { value }) => {
    const states = this.state.shows;
    states[value] = !states[value];
    this.setState({ shows: states });
  };

  saveSearchKey = (e, { typeData, value }) => {
    if (typeData === 0)
      switch (typeData) {
        case 0:
          this.setState({ name: value });
          break;
        case 1:
          this.setState({ primarySkill: value });
          break;
        case 2:
          this.setState({ statusVacancy: value });
          break;
        case 5:
          this.setState({ statusCandidate: value });
          break;
        case 3:
          this.setState({ city: value });
          break;
        case 4:
          this.setState({ date: value });
          break;
        default:
          break;
      }
  };

  render() {
    return (
      <Menu secondary vertical className="custom">
        <Menu.Item value={0} onClick={this.handleChange}>
          candidate name
        </Menu.Item>

        {this.state.shows[0] &&
          <Input
            focus
            placeholder="Input candidate name"
            typeData={0}
            onChange={this.saveSearchKey}
          />}

        <Menu.Item value={1} onClick={this.handleChange}>
          technology
        </Menu.Item>
        {this.state.shows[1] &&
          <Dropdown
            placeholder="choose technology"
            selection
            options={primarySkills}
            typeData={1}
            onChange={this.saveSearchKey}
          />}

        <Menu.Item value={2} onClick={this.handleChange}>
          vacancy status
        </Menu.Item>
        {this.state.shows[2] &&
          <Dropdown
            placeholder="choose vacancy status"
            selection
            options={statusesVacancy}
            typeData={2}
            onChange={this.saveSearchKey}
          />}

        <Menu.Item value={5} onClick={this.handleChange}>
          candidate status
        </Menu.Item>
        {this.state.shows[5] &&
          <Dropdown
            placeholder="choose candidate status"
            selection
            options={statusesCandidate}
            typeData={5}
            onChange={this.saveSearchKey}
          />}

        <Menu.Item value={3} onClick={this.handleChange}>
          city
        </Menu.Item>
        {this.state.shows[3] &&
          <Input
            focus
            placeholder="Input city"
            typeData={3}
            onChange={this.saveSearchKey}
          />}

        <Menu.Item value={4} onClick={this.handleChange}>
          date
        </Menu.Item>
        {this.state.shows[4] &&
          <Input
            focus
            placeholder="Input date"
            onChange={this.saveSearchKey}
            type="date"
            typeData={4}
          />}
      </Menu>
    );
  }
}
