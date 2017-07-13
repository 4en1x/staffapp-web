import React from "react";
import { Accordion, Menu, Dropdown, Icon } from "semantic-ui-react";

import "./interviews-filter.css";

export default class InterviewsFilterComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStatus: "",
      activePrimarySkill: "",
      activeOtherSkills: []
    };
  }

  handleStatusClick = (e, { name }) => {
    this.setState({ activeStatus: name });
  };
  handlePrimarySkillClick = (e, { value }) => {
    this.setState({ activePrimarySkill: value });
  };
  handleOtherSkillsClick = (e, { value }) => {
    this.setState({
      activeOtherSkills: value
    });
  };

  render() {
    // const Statuses = this.props.Statuses.map(item => {
    // return { key: item, name: item };
    // });

    // const PrimarySkills = this.props.primarySkills.map(item => {
    // return { key: item, value: item, text: item };
    // });;

    // const SecondSkills = this.props.secondSkills.map(item => {
    // return { key: item, value: item, text: item };
    // });

    const Statuses = ["Pool ", "In progress", "Hired"].map(item => ({
      key: item,
      name: item
    }));

    const PrimarySkills = [
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

    const SecondSkills = ["Angular", "ReactJS", "NodeJS"].map(item => ({
      key: item,
      value: item,
      text: item
    }));

    return (
      <Menu secondary vertical className="filter">
        <Accordion styled>
          <Accordion.Title>
            Status
            <Icon name="triangle down" />
          </Accordion.Title>
          <Accordion.Content>
            <Menu text vertical items={Statuses} />
          </Accordion.Content>
        </Accordion>
        <Dropdown
          placeholder="Primary skill"
          selection
          options={PrimarySkills}
          onChange={this.handlePrimarySkillClick}
        />
        <Dropdown
          placeholder="Other skills"
          multiple
          search
          selection
          options={SecondSkills}
          onChange={this.handleSecondSkillsClick}
        />
      </Menu>
    );
  }
}
