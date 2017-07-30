import React from "react";
import "./interview.css";
import { Field, reduxForm } from "redux-form";
import {
  Button,
  Dropdown,
  Segment,
  Divider,
  Header,
  Input
} from "semantic-ui-react";
import CustonSearch from "./search";

const typeList = [
  {
    key: "tech",
    text: "meeting with workers",
    value: "tech"
  },
  {
    key: "hr",
    text: "meeting with HRMs",
    value: "HR"
  },
  {
    key: "owner",
    text: "meeting with owner",
    value: "owner"
  }
];
const citiesList = [];
const hrSkillList = [];
const primarySkillList = [];
const secondarySkillList = [];
const otherSkillList = [];
let users = [];

class InterviewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeInterview: ""
    };

    if (props.data) {
      users = props.data.users;
      let initData = {
        place: props.data.place,
        date: props.data.date,
        users: props.data.users
      };
      props.initialize(initData);
    }
  }

  getDataFromServer = value => {
    if (value === "tech") {
      return {
        primary: ["primaryOne"],
        secondary: ["secondaryOne", "secondaryTwo", "secondaryThree"],
        other: ["otherOne", "otherTwo", "otherThree"]
      };
    } else return { hr: ["something1", "something2", "something3"] };
  };
  buildArrays = () => {
    let value;
    if (this.state.typeInterview !== "owner")
      value = this.getDataFromServer(this.state.typeInterview);
    if (this.state.typeInterview === "tech") {
      value.primary.map(step => {
        const temp = {
          key: step,
          text: step,
          value: step
        };
        primarySkillList.push(temp);
        return null;
      });
      value.secondary.map(step => {
        const temp = {
          key: step,
          text: step,
          value: step
        };
        secondarySkillList.push(temp);
        return null;
      });
      value.other.map(step => {
        const temp = {
          key: step,
          text: step,
          value: step
        };
        otherSkillList.push(temp);
        return null;
      });
    } else if (this.state.typeInterview === "HR") {
      value.hr.map(step => {
        const temp = {
          key: step,
          text: step,
          value: step
        };
        hrSkillList.push(temp);
        return null;
      });
    }
  };

  nameInput = ({ input }) => {
    return (
      <CustonSearch
        input={{ icon: "search", iconPosition: "left" }}
        onDataChange={(param, data) => {
          input.onChange(data);
        }}
        tempData={users}
      />
    );
  };
  primarySkillsInput = ({ input }) => {
    return (
      <Dropdown
        selection
        {...input}
        value={input.value}
        onChange={(param, data) => {
          input.onChange(data.value);
        }}
        placeholder="skills"
        multiple
        search
        options={primarySkillList}
      />
    );
  };
  secondarySkillsInput = ({ input }) => {
    return (
      <Dropdown
        selection
        {...input}
        value={input.value}
        onChange={(param, data) => {
          input.onChange(data.value);
        }}
        placeholder="skills"
        multiple
        search
        options={secondarySkillList}
      />
    );
  };
  otherSkillsInput = ({ input }) => {
    return (
      <Dropdown
        selection
        {...input}
        value={input.value}
        onChange={(param, data) => {
          input.onChange(data.value);
        }}
        placeholder="skills"
        multiple
        search
        options={otherSkillList}
      />
    );
  };
  hrSkillsInput = ({ input }) => {
    return (
      <Dropdown
        selection
        {...input}
        value={input.value}
        onChange={(param, data) => {
          input.onChange(data.value);
        }}
        placeholder="skills"
        fluid
        multiple
        search
        options={hrSkillList}
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
  dateInput = ({ input }) => {
    return (
      <Input {...input} placeholder="from" className="text-area" type="date" />
    );
  };
  typeSkillInput = ({ input }) => {
    return (
      <Dropdown
        placeholder="type of meeting"
        {...input}
        value={input.value}
        onChange={(param, data) => {
          this.setState({ typeInterview: data.value }, () => {
            this.buildArrays();
          });
          input.onChange(data.value);
        }}
        search
        selection
        options={typeList}
      />
    );
  };
  prepareData = value => {
    let data = {};
    data.place = value.place;
    data.users = value.users;
    data.date = value.date;
    if (!this.props.data) {
      data.type = value.type;
      data.fields = [];
      if (value.type === "tech") {
        if (value.primary)
          value.primary.map(item => {
            const temp = {
              name: item,
              type: "tech",
              typeSkill: "primary"
            };
            data.fields.push(temp);
          });
        if (value.secondary)
          value.secondary.map(item => {
            const temp = {
              name: item,
              type: "tech",
              typeSkill: "secondary"
            };
            data.fields.push(temp);
          });
        if (value.other)
          value.other.map(item => {
            const temp = {
              name: item,
              type: "tech",
              typeSkill: "other"
            };
            data.fields.push(temp);
          });
      } else if (value.type === "HR") {
        if (value.hr)
          value.hr.map(item => {
            const temp = {
              name: item
            };
            data.fields.push(temp);
          });
      }
    }
    this.props.onSubmit(data);
  };

  render() {
    this.props.cities.map(step => {
      const temp = {
        key: step,
        text: step,
        value: step
      };
      citiesList.push(temp);
      return null;
    });
    const { handleSubmit, submitting } = this.props;

    return (
      <form
        onSubmit={handleSubmit(this.prepareData)}
        className="interview-detail-page"
      >
        <div className="interview-content">
          <div className="content-top">
            <div className="data-top">
              <Header as="h2" className="name-label">
                {!this.props.data && "creating interview form"}
                {this.props.data && "editing interview form"}
              </Header>
            </div>
            <Divider />
          </div>
          <Segment className="content-description" raised>
            <div className="item-with-label">
              <Header as="h3">Users</Header>
              <Field name={"users"} component={this.nameInput} />
            </div>
            <Divider />
            <div className="item-with-label">
              <Header as="h3">Place</Header>
              <Field name={"place"} component={this.cityInput} />
            </div>
            <Divider />
            <div className="item-with-label">
              <Header as="h3">Date</Header>
              <Field name={"date"} component={this.dateInput} />
            </div>

            {!this.props.data &&
              <div>
                <Divider />
                <div className="item-with-label">
                  <Header as="h3">Type</Header>
                  <Field name={"type"} component={this.typeSkillInput} />
                </div>
                {this.state.typeInterview === "tech" &&
                  <div className="item-with-label">
                    <Divider />
                    <Header as="h3">Primary skills</Header>
                    <Field
                      name={"primary"}
                      component={this.primarySkillsInput}
                    />
                  </div>}
                {this.state.typeInterview === "tech" &&
                  <div className="item-with-label">
                    <Header as="h3">Secondary Skills</Header>
                    <Field
                      name={"secondary"}
                      component={this.secondarySkillsInput}
                    />
                  </div>}
                {this.state.typeInterview === "tech" &&
                  <div className="item-with-label">
                    <Header as="h3">Other skills</Header>
                    <Field name={"other"} component={this.otherSkillsInput} />
                  </div>}
                {this.state.typeInterview === "HR" &&
                  <div className="item-with-label">
                    <Divider />
                    <Header as="h3">Communication Skills</Header>
                    <Field name={"hr"} component={this.hrSkillsInput} />
                  </div>}
              </div>}

            <div className="add-interview">
              <Button primary disabled={submitting}>
                Send interview card
              </Button>
            </div>
          </Segment>
        </div>
      </form>
    );
  }
}

export default reduxForm({ form: "addInterview" })(InterviewComponent);
