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
  Popup,
  List
} from "semantic-ui-react";
import CommunicationsList from "./list/communications-list";
import Contacts from "./list/contacts-list";
import SkillsList from "./list/skills-list";
import "./candidate.css";

const statusList = [];
const skillList = [];
// let links = [];
// let counter = -1;

class Candidate extends React.Component {
  componentDidMount() {
    if (this.props.data) {
      // links = this.props.data.contacts.links;
      let initData = {
        name: this.props.data.communication.name,
        surname: this.props.data.communication.surname,
        email: this.props.data.contacts.email,
        primarySkill: this.props.data.skills.primarySkill,
        primarySkillYearStart: this.props.data.skills.primarySkillYearStart,
        phone: this.props.data.contacts.phone,
        englishLevel: this.props.data.skills.englishLevel,
        secondarySkills: this.props.data.skills.secondarySkills,
        status: this.props.data.communication.status,
        city: this.props.data.contacts.city,
        salary: this.props.data.communication.salary,
        resume: this.props.data.communication.resume,
        linkedIn: this.props.data.contacts.linkedIn,
        skype: this.props.data.contacts.skype,
        vacancy: this.props.data.communication.vacancy,
        links: this.props.data.contacts.links
      };
      // this.props.data.contacts.links.map(link => {
      //   const temp = "link" + counter;
      //   initData[temp] = link;
      //   counter++;
      // });
      this.props.initialize(initData);
    }
  }

  nameInput = ({ input }) => {
    return <Input {...input} placeholder="name" className="text-area" />;
  };
  primarySkillDataInput = ({ input }) => {
    return (
      <Input {...input} placeholder="from" className="text-area" label="from" />
    );
  };
  surnameInput = ({ input }) => {
    return <Input {...input} placeholder="surname" className="text-area" />;
  };
  primarySkillInput = ({ input }) => {
    return (
      <Dropdown
        placeholder="major skill"
        {...input}
        value={input.value}
        onChange={(param, data) => {
          input.onChange(data.value);
        }}
        search
        selection
        options={skillList}
      />
    );
  };
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
  // addNewLink = () => {
  //   console.log("LALALLALALA");
  //   links.push("link" + counter);
  //   counter++;
  // };

  render() {
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
        key: step,
        text: step,
        value: step
      };
      statusList.push(temp);
      return null;
    });
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit} className="candidate-detail-page">
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
                      name
                      <Field name={"name"} component={this.nameInput} />
                    </div>
                  </List.Item>
                  <List.Item>
                    <div className="item-with-label">
                      surname
                      <Field name={"surname"} component={this.surnameInput} />
                    </div>
                  </List.Item>
                  <List.Item>
                    <div className="item-with-label">
                      primary skill
                      <Field
                        name={"primarySkill"}
                        component={this.primarySkillInput}
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
                      status
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

            {/*<div className="pudding-other-links">*/}
              {/*<div className="label-info"> Other links </div>*/}
              {/*<div className="theard-form-line">*/}
                {/*{links.map((step, move) =>*/}
                  {/*<Field*/}
                    {/*name={"links"+move}*/}
                    {/*component={this.nameInput}*/}
                  {/*/>*/}
                {/*)}*/}
                {/*<a href={this.addNewLink()}>+++++++++++</a>*/}
              {/*</div>*/}
            {/*</div>*/}

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

export default reduxForm({ form: "addCandidate" })(Candidate);