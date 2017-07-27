import React from "react";
import { Field, reduxForm } from "redux-form";
import { Segment, Dropdown, Input, Button } from "semantic-ui-react";

const primarySkillList = [];
const secondarySkillList = [];

class Vacancy extends React.Component {
  componentDidMount() {
    if (this.props.data) {
      const initData = {
        name: this.props.data.name,
        primarySkill: this.props.data.primarySkill,
        secondarySkills: this.props.data.skills,
        description: this.props.data.description
      };
      this.props.initialize(initData);
    }
  }
  nameInput = ({ input }) =>
    <Input {...input} placeholder="name" className="text-area" />;
  dateInput = ({ input }) =>
    <Input {...input} type="date" placeholder="date" className="text-area" />;
  primarySkillInput = ({ input }) =>
    <Dropdown
      placeholder="major skill"
      {...input}
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
      {...input}
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
  labelInput = ({ input }) =>
    <Input {...input} placeholder="label" className="text-area" />;
  descriptionInput = ({ input }) =>
    <Input {...input} placeholder="description" className="text-area" />;

  render() {
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
        key: step.name,
        text: step.name,
        value: step
      };
      secondarySkillList.push(temp);
      return null;
    });
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit} className="vacancy-detail-page">
        <div className="vacancy-detail-page_project-name">
          <Field name={"name"} component={this.nameInput} />
        </div>
        <Segment className="vacancy-detail-page_content">
          <div className="vacancy-detail-page_content-top">
            <div className="vacancy-detail-page_primary-skill">
              <Field name={"primarySkill"} component={this.primarySkillInput} />
            </div>
            <div className="vacancy-detail-page_deadline-date">
              <Field name={"date"} component={this.dateInput} />
            </div>
          </div>
          <div className="vacancy-detail-page_content-list">
            <div className="vacancy-detail-page_skills-list">
              <Field
                name={"secondarySkills"}
                component={this.secondarySkillsInput}
              />
            </div>
          </div>
          <div className="vacancy-detail-page_content-description">
            <div className="vacancy-detail-page_label">
              <Field name={"label"} component={this.labelInput} />
            </div>
            <div className="vacancy-detail-page_description">
              <Field name={"description"} component={this.descriptionInput} />
            </div>
          </div>
          <div className="vacancy-detail-page_content-date">
            <div className="vacancy-detail-page_create-date" />
            <div className="vacancy-detail-page_change-date" />
          </div>
          <div className="vacancy-detail-page_edit-button">
            <Button primary disabled={submitting}>
              Send vacancy card
            </Button>
          </div>
        </Segment>
      </form>
    );
  }
}

export default reduxForm({ form: "addVacancy" })(Vacancy);
