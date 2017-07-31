import React from "react";
import { Field, reduxForm } from "redux-form";
import {
  Dropdown,
  Input,
  Button,
  Header,
  Divider,
  Segment
} from "semantic-ui-react";
import "./vacancy.css";

const primarySkillList = [];
let secondarySkillList = [];
const citiesList = [];
const statusList = [];

class Vacancy extends React.Component {
  constructor(props) {
    super(props);

    this.fillLists();
  }

  nameInput = ({ input }) =>
    <Input {...input} placeholder="name" className="text-area" />;
  salaryInput = ({ input }) =>
    <Input
      {...input}
      placeholder="salary"
      type="number"
      className="text-area"
    />;
  dateInput = ({ input }) =>
    <Input {...input} type="date" placeholder="date" className="text-area" />;
  primarySkillInput = ({ input }) =>
    <Dropdown
      placeholder="major skill"
      value={input.value}
      onChange={(param, data) => {
        input.onChange(data.value);
      }}
      search
      selection
      options={primarySkillList}
    />;
  secondarySkillsInput = ({ input }) =>
    <Dropdown
      selection
      value={input.value}
      onChange={(param, data) => {
        input.onChange(data.value);
      }}
      placeholder="minor skills"
      fluid
      multiple
      search
      options={secondarySkillList}
    />;
  descriptionInput = ({ input }) =>
    <Input {...input} placeholder="description" className="text-area" />;
  statusInput = ({ input }) => {
    return (
      <Dropdown
        placeholder="status"
        {...input}
        value={input.value}
        onChange={(param, data) => {
          input.onChange(data.value);
        }}
        search
        selection
        options={statusList}
      />
    );
  };
  cityInput = ({ input }) => {
    return (
      <Dropdown
        placeholder="city"
        {...input}
        value={input.value}
        onChange={(param, data) => {
          input.onChange(data.value);
        }}
        search
        selection
        options={citiesList}
      />
    );
  };
  fillLists = () => {
    this.props.majorSkills.map(step => {
      const temp = {
        key: step,
        text: step,
        value: step
      };
      primarySkillList.push(temp);
      return null;
    });
    this.props.minorSkills.map(step => {
      const temp = {
        key: step,
        text: step,
        value: step
      };
      secondarySkillList.push(temp);
      return null;
    });
    this.props.statuses.map(step => {
      const temp = {
        key: step,
        text: step,
        value: step
      };
      statusList.push(temp);
      return null;
    });
    this.props.cities.map(step => {
      const temp = {
        key: step,
        text: step,
        value: step
      };
      citiesList.push(temp);
      return null;
    });

    /////////////////////////
      let initData = {};
      if (this.props.data) {
          initData = {
              status: this.props.data.status,
              jobStart: this.props.data.jobStart,
              salary: this.props.data.salary,
              name: this.props.data.name,
              primarySkill: this.props.data.primarySkill,
              skills: this.props.data.skills,
              description: this.props.data.description,
              city: this.props.data.city
          };
          // props.data.skills.map(value => initData.secondarySkills.push(value.name));
          this.props.initialize(initData);
      }
  };

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit} className="vacancy-detail-page">
        <div className="vacancy-content">
          <div className="content-top">
            <div className="data-top">
              <Header as="h2" className="name-label">
                {!this.props.data && "creating vacancy form"}
                {this.props.data && "editing vacancy form"}
              </Header>
            </div>
            <Divider />
          </div>
          <Segment className="content-description" raised>
            <div className="first-form-line">
              <div className="left-form-block">
                <div className="item-with-label">
                  <Header as="h3">project name</Header>
                  <Field name={"name"} component={this.nameInput} />
                </div>

                <div className="item-with-label">
                  <Header as="h3">place</Header>
                  <Field name={"city"} component={this.cityInput} />
                </div>

                <div className="item-with-label">
                  <Header as="h3">status</Header>
                  <Field name={"status"} component={this.statusInput} />
                </div>

                <div className="item-with-label">
                  <Header as="h3">project salary</Header>
                  <Field name={"salary"} component={this.salaryInput} />
                </div>
              </div>

              <div className="right-form-block">
                <div className="item-with-label">
                  <Header as="h3">primary skill</Header>
                  <Field
                    name={"primarySkill"}
                    component={this.primarySkillInput}
                  />
                </div>

                <div className="item-with-label">
                  <Header as="h3">job start date</Header>
                  <Field name={"jobStart"} component={this.dateInput} />
                </div>

                <div className="item-with-label">
                  <Header as="h3">secondary skills</Header>
                  <Field
                    name={"skills"}
                    component={this.secondarySkillsInput}
                  />
                </div>
                <div className="item-with-label">
                  <Header as="h3">description</Header>
                  <Field
                    name={"description"}
                    component={this.descriptionInput}
                  />
                </div>
              </div>
            </div>
            <div className="add-vacancy">
              <Button primary disabled={submitting}>
                Send vacancy card
              </Button>
            </div>
          </Segment>
        </div>
      </form>
    );
  }
}

export default reduxForm({ form: "addVacancy" })(Vacancy);
