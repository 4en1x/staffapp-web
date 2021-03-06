import React from "react";
import { Field, reduxForm } from "redux-form";
import {
  Segment,
  Divider,
  Header,
  Dropdown,
  Input,
  Button,
  Icon,
  List,
  Label
} from "semantic-ui-react";
import CommunicationsList from "./communications-list";
import Contacts from "./contacts-list";
import SkillsList from "./skills-list";
import "./candidate.css";

let statusList = [];
let skillList = [];

let counter = 0;

const validate = values => {
  const errors = {};
  if (!values.name) errors.name = "Please enter name";
  if (!values.englishLevel) errors.englishLevel = "Please enter english level";
  if (!values.surname) errors.surname = "Please enter surname";
  if (!values.email) errors.email = "Please enter email";
   else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) errors.email = 'Please check email';
  if (values.phone && !/^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/i.test(values.phone)) errors.phone = 'Please check phone number';
  if (!values.primarySkill) errors.primarySkill = "Please enter primary skill";
  if (!values.status) errors.status = "Please enter status";
  return errors;
};

class Candidate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: []
    };
    this.initialData();
  }

  initialData = () => {
    skillList =[];
    statusList =[];
    this.props.majorSkills.map(step => {
      const temp = {
        key: step,
        text: step,
        value: step
      };
      skillList.push(temp);
      return null;
    });
    this.props.statuses.map(step => {
      const temp = {
        key: "key" + step,
        text: step,
        value: step
      };
      statusList.push(temp);
      return null;
    });

    ////////////////////////////
      counter=0;
    if (this.props.data) {
      const links = this.state.links;
      this.props.data.info.contacts.links.map(link => links.push(link));
      this.setState({ links });

      console.log(this.props.data);

      let initData = {
        name: this.props.data.name,
        surname: this.props.data.surname,
        email: this.props.data.info.contacts.email,
        primarySkill: this.props.data.info.skills.primarySkill,
        primarySkillYearStart: this.props.data.info.skills.primarySkillYearStart,
        phone: this.props.data.info.contacts.phone,
        englishLevel: this.props.data.info.skills.englishLevel,
        secondarySkills: this.props.data.info.skills.secondarySkills,
        status: this.props.data.status,
        city: this.props.data.city,
        salary: this.props.data.info.communication.salary,
        resume: this.props.data.info.communication.resume,
        linkedin: this.props.data.info.contacts.linkedin,
        skype: this.props.data.info.contacts.skype,
        vacancy: this.props.data.info.communication.vacancy,
        links: {}
        // links: this.props.data.contacts.links
      };

      this.props.data.info.contacts.links.map(link => {
        const temp = "link" + counter;
        initData.links[temp] = link;
        counter++;
      });

      this.props.initialize(initData);
    }
  };
  nameInput = ({ input, meta: { touched, error } }) => {
    return (
      <div className="field-with-warning">
        <Input {...input} placeholder="name" />
        {touched &&
          (error &&
            <div className="warning-block">
              <Label basic color="red" pointing>
                  {error}
              </Label>
            </div>)}
      </div>
    );
  };
  linkInput = ({ input }) => {
    return (
      <Input
        {...input}
        placeholder="other link"
        className="small-margin-links"
      />
    );
  };
  primarySkillDataInput = ({ input }) => {
    return (
      <Input {...input} placeholder="from" type="number" className="text-area" label="from" />
    );
  };
  surnameInput = ({ input, meta: { touched, error } }) => {
    return (
      <div className="field-with-warning">
        <Input {...input} placeholder="surname" />
        {touched &&
          (error &&
            <div className="warning-block">
              <Label basic color="red" pointing>
                  {error}
              </Label>
            </div>)}
      </div>
    );
  };
  primarySkillInput = ({ input, meta: { touched, error } }) => {
    return (
      <div className="field-with-warning">
        <Dropdown
          placeholder="primary skill"
          {...input}
          value={input.value}
          onChange={(param, data) => {
            input.onChange(data.value);
          }}
          search
          selection
          options={skillList}
        />
        {touched &&
          (error &&
            <div className="warning-block">
              <Label basic color="red" pointing>
                  {error}
              </Label>
            </div>)}
      </div>
    );
  };
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
                  {error}
              </Label>
            </div>)}
      </div>
    );
  };
  prepareData = values => {
    let data = {
      name: values.name,
      surname: values.surname,
      email: values.email,
      primarySkill: values.primarySkill,
      primarySkillYearStart: values.primarySkillYearStart,
      phone: values.phone,
      englishLevel: values.englishLevel,
      skills: values.secondarySkills,
      status: values.status,
      city: values.city,
      salary: values.salary,
      resume: values.resume,
      linkedin: values.linkedin,
      skype: values.skype,
      vacancy: values.vacancy,
      links: []
    };
    for (var item in values.links) {
      data.links.push(values.links[item]);
    }
    this.props.onSubmit(data);
  };
  addNewLink = () => {
    const links = this.state.links.slice();
    links.push("link" + counter);
    this.setState({ links });
    counter++;
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form
        onSubmit={handleSubmit(this.prepareData)}
        className="candidate-detail-page"
      >
        <div className="content">
          <div className="content-top">
            <div className="data-top">
              <Header as="h2" className="name-label">
                {!this.props.data && "creating candidate form"}
                {this.props.data && "editing candidate form"}
              </Header>
            </div>
            <Divider />
          </div>
          <Segment className="content-description" raised>
            <div className="first-form-line">
              <div className="name-form-block">
                <div className="label-info"> Main </div>
                <List>
                  <List.Item>
                    <div className="item-with-label">
                      name *
                      <Field name={"name"} component={this.nameInput} />
                    </div>
                  </List.Item>
                  <List.Item>
                    <div className="item-with-label">
                      surname *
                      <Field name={"surname"} component={this.surnameInput} />
                    </div>
                  </List.Item>
                  <List.Item>
                    <div className="item-with-label">
                      primary skill *
                      <Field
                        name={"primarySkill"}
                        component={this.primarySkillInput}
                        requered
                      />
                    </div>
                  </List.Item>
                  <List.Item>
                    <div className="item-with-label">
                      Year started with primary skill
                      <Field
                        name={"primarySkillYearStart"}
                        component={this.primarySkillDataInput}
                      />
                    </div>
                  </List.Item>
                  <List.Item>
                    <div className="item-with-label">
                      status *
                      <Field name={"status"} component={this.statusInput} />
                    </div>
                  </List.Item>
                </List>
              </div>

              <div className="contacts-form-block">
                <div className="label-info"> Contacts </div>
                <Contacts data={this.props.data} cities={this.props.cities} />
              </div>
            </div>

            <div className="second-form-line">
              <div className="skill-form-block">
                <div className="label-info"> Skills </div>
                <SkillsList minorSkills={this.props.minorSkills} />
              </div>

              <div className="communication-form-block">
                <div className="label-info"> Communication </div>
                <CommunicationsList />
              </div>
            </div>

            <div className="pudding-other-links">
              <div className="label-info"> Other links </div>
              <div className="theard-form-line">
                {this.state.links.map((step, move) =>
                  <Field
                    name={"links.link" + move}
                    component={this.linkInput}
                    key={"links.link" + move}
                  />
                )}
                <Button
                  type="button"
                  onClick={this.addNewLink}
                  className="small-margin-button"
                >
                  +
                </Button>
              </div>
            </div>

            <div className="add-candidate">
              <Button primary disabled={submitting}>
                Send cadidate card
              </Button>
            </div>
          </Segment>
        </div>
      </form>
    );
  }
}

export default reduxForm({ form: "addCandidate", validate })(Candidate);
