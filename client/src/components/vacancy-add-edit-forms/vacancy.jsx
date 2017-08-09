import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Dropdown,
  Input,
  Button,
  Header,
  Divider,
  Segment,
  Label
} from 'semantic-ui-react';
import './vacancy.css';

let primarySkillList = [];
let secondarySkillList = [];
let citiesList = [];
let statusList = [];

const validate = values => {
  const errors = {};
  if (!values.name) errors.name = 'Required';
  if (!values.status) errors.status = 'Required';
  if (!values.primarySkill) errors.primarySkill = 'Required';
  return errors;
};

class Vacancy extends React.Component {
  constructor(props) {
    super(props);
    this.initialData();
  }

  nameInput = ({ input, meta: { touched, error } }) => {
    return (
      <div className="field-with-warning">
        <Input {...input} placeholder="name" className="text-area" />
        {touched &&
          (error &&
            <div className="warning-block">
              <Label basic color="red" pointing>
                Please enter name
              </Label>
            </div>)}
      </div>
    );
  };
  salaryInput = ({ input }) =>
    <Input
      {...input}
      placeholder="salary"
      type="number"
      className="text-area"
    />;
  dateInput = ({ input }) =>
    <Input {...input} type="date" placeholder="date" className="text-area" />;
  primarySkillInput = ({ input, meta: { touched, error } }) => {
    return (
      <div className="field-with-warning">
        <Dropdown
          placeholder="major skill"
          value={input.value}
          onChange={(param, data) => {
            input.onChange(data.value);
          }}
          search
          selection
          options={primarySkillList}
        />
        {touched &&
          (error &&
            <div className="warning-block">
              <Label basic color="red" pointing>
                Please enter primary skill
              </Label>
            </div>)}
      </div>
    );
  };
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
  statusInput = ({ input, meta: { touched, error } }) => {
    return (
      <div className="field-with-warning">
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
        {touched &&
          (error &&
            <div className="warning-block">
              <Label basic color="red" pointing>
                Please enter status
              </Label>
            </div>)}
      </div>
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
  initialData = () => {
    primarySkillList = [];
    secondarySkillList = [];
    citiesList = [];
    statusList = [];

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
      let date = new Date(this.props.data.jobStart);
      initData = {
        status: this.props.data.status,
        jobStart: date.toISOString().split('T')[0],
        salary: this.props.data.salary,
        name: this.props.data.name,
        primarySkill: this.props.data.primarySkill,
        skills: this.props.data.secondarySkills,
        description: this.props.data.description,
        city: this.props.data.city
      };
      // props.data.skills.map(value => initData.secondarySkills.push(value.name));
      this.props.initialize(initData);
    }
  };

  render() {
    console.log(this.props);
    const { handleSubmit, submitting } = this.props;

    return (
      <div className="page-content">
        <div className="content-tab background padded">
          <Header
            as="h1"
            content={this.props.data ? 'Editing vacancy' : 'Creating vacancy'}
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="content-tab background padded "
        >
          <div className="vacancy-content">
            <div className="first-form-line">
              <div className="left-form-block">
                <div className="item-with-label">
                  <Header as="h3">project name *</Header>
                  <Field name={'name'} component={this.nameInput} />
                </div>

                <div className="item-with-label">
                  <Header as="h3">place</Header>
                  <Field name={'city'} component={this.cityInput} />
                </div>

                <div className="item-with-label">
                  <Header as="h3">status *</Header>
                  <Field name={'status'} component={this.statusInput} />
                </div>

                <div className="item-with-label">
                  <Header as="h3">project salary</Header>
                  <Field name={'salary'} component={this.salaryInput} />
                </div>
              </div>

              <div className="right-form-block">
                <div className="item-with-label">
                  <Header as="h3">primary skill *</Header>
                  <Field
                    name={'primarySkill'}
                    component={this.primarySkillInput}
                  />
                </div>

                <div className="item-with-label">
                  <Header as="h3">job start date</Header>
                  <Field name={'jobStart'} component={this.dateInput} />
                </div>

                <div className="item-with-label">
                  <Header as="h3">skills</Header>
                  <Field
                    name={'skills'}
                    component={this.secondarySkillsInput}
                  />
                </div>
                <div className="item-with-label">
                  <Header as="h3">description</Header>
                  <Field
                    name={'description'}
                    component={this.descriptionInput}
                  />
                </div>
              </div>
            </div>
            <div className="add-vacancy">
              <Button
                color="twitter"
                disabled={submitting}
                content={this.props.data ? 'Save' : 'Add'}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({ form: 'addVacancy', validate })(Vacancy);
