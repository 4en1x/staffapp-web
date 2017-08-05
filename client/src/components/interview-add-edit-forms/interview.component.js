import React from 'react';
import './interview.css';
import { Field, reduxForm } from 'redux-form';
import {
  Button,
  Dropdown,
  Segment,
  Divider,
  Header,
  Input,
  Icon,
  Label
} from 'semantic-ui-react';

const typeList = [
  {
    key: 'tech',
    text: 'meeting with workers',
    value: 'tech'
  },
  {
    key: 'hr',
    text: 'meeting with HRMs',
    value: 'HR'
  },
  {
    key: 'owner',
    text: 'meeting with owner',
    value: 'owner'
  }
];
const hrSkillList = [];
const usersList = [];
const primarySkillList = [];
const secondarySkillList = [];
const otherSkillList = [];

const validate = values => {
  const errors = {};
  if (!values.type) errors.name = 'Required';
  return errors;
};

class InterviewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeInterview: ''
    };
    this.initialData();
  }

  initialData = () => {
    this.props.skillsList.users.map(step => {
      const temp = {
        key: step.id,
        text: step.id,
        value: step.id,
        content: ' ',
        label: (
          <Label color="blue">
            {step.name}
            <Label.Detail>
              {step.role} {step.email}
            </Label.Detail>
          </Label>
        )
      };
      usersList.push(temp);
      return null;
    });

    if (this.props.data) {
      let date = new Date(this.props.data.date);
      let initData = {
        place: this.props.data.place,
        date: date.toISOString().split('T')[0],
        time: this.props.data.time
      };
      this.props.initialize(initData);
    }
  };
  buildArrays = () => {
    if (this.state.typeInterview === 'tech') {
      this.props.skillsList.primary.map(step => {
        const temp = {
          key: step,
          text: step,
          value: step
        };
        primarySkillList.push(temp);
        return null;
      });
      this.props.skillsList.secondary.map(step => {
        const temp = {
          key: step,
          text: step,
          value: step
        };
        secondarySkillList.push(temp);
        return null;
      });
      this.props.skillsList.other.map(step => {
        const temp = {
          key: step,
          text: step,
          value: step
        };
        otherSkillList.push(temp);
        return null;
      });
    } else if (this.state.typeInterview === 'HR') {
      this.props.skillsList.hr.map(step => {
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
      <Dropdown
        selection
        value={input.value}
        onChange={(param, data) => {
          input.onChange(data.value);
        }}
        placeholder="users"
        multiple
        search
        options={usersList}
      />
    );
  };
  primarySkillsInput = ({ input }) => {
    return (
      <Dropdown
        selection
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
    return <Input {...input} placeholder="city" className="text-area" />;
  };
  dateInput = ({ input }) => {
    return (
      <Input
        {...input}
        className="text-area"
        type="date"
        label={{ basic: true, content: <Icon name="calendar" /> }}
        labelPosition="left"
      />
    );
  };
  timeInput = ({ input }) => {
    return (
      <Input
        {...input}
        className="text-area"
        type="time"
        label={{ basic: true, content: <Icon name="time" /> }}
        labelPosition="left"
      />
    );
  };
  typeSkillInput = ({ input, meta: { touched, error } }) => {
    return (
      <div className="field-with-warning">
        <Dropdown
          placeholder="type of meeting"
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
        {touched &&
          (error &&
            <div className="warning-block">
              <Label basic color="red" pointing>
                Please enter meeting type
              </Label>
            </div>)}
      </div>
    );
  };
  prepareData = value => {
    let data = {};
    data.place = value.place;
    data.users = value.users;
    if (value.time) data.date = value.date + ' ' + value.time + ':00';
    else data.date = value.date;
    data.userNames = [];
    if (!this.props.data) {
      data.type = value.type;
      data.fields = [];
      if (value.type === 'tech') {
        if (value.primary)
          value.primary.map(item => {
            const temp = {
              name: item,
              type: 'tech',
              typeSkill: 'primary'
            };
            data.fields.push(temp);
          });
        if (value.secondary)
          value.secondary.map(item => {
            const temp = {
              name: item,
              type: 'tech',
              typeSkill: 'secondary'
            };
            data.fields.push(temp);
          });
        if (value.other)
          value.other.map(item => {
            const temp = {
              name: item,
              type: 'tech',
              typeSkill: 'other'
            };
            data.fields.push(temp);
          });
      } else if (value.type === 'HR') {
        if (value.hr)
          value.hr.map(item => {
            const temp = {
              name: item
            };
            data.fields.push(temp);
          });
      }
    }
    if (value.users) {
      value.users.map(item => {
        this.props.skillsList.users.map(item2 => {
          if (item === item2.id) data.userNames.push(item2.name);
        });
      });
    }
    this.props.onSubmit(data);
  };

  render() {
    const { reset, handleSubmit, submitting } = this.props;

    return (
      <form
        onSubmit={handleSubmit(this.prepareData)}
        className="interview-detail-page"
      >
        <Segment raised>
          <div className="item-with-label">
            <Header as="h3">Users</Header>
            <Field name={'users'} component={this.nameInput} />
          </div>
          <Divider />
          <div className="item-with-label">
            <Header as="h3">Place</Header>
            <Field name={'place'} component={this.cityInput} />
          </div>
          <Divider />
          <div className="item-with-label">
            <Header as="h3">Date</Header>
            <Field name={'date'} component={this.dateInput} />
            <Field name={'time'} component={this.timeInput} />
          </div>

          {!this.props.data &&
            <div>
              <Divider />
              <div className="item-with-label">
                <Header as="h3">Type *</Header>
                <Field name={'type'} component={this.typeSkillInput} />
              </div>
              {this.state.typeInterview === 'tech' &&
                <div className="item-with-label">
                  <Divider />
                  <Header as="h3">Primary skills</Header>
                  <Field name={'primary'} component={this.primarySkillsInput} />
                </div>}
              {this.state.typeInterview === 'tech' &&
                <div className="item-with-label">
                  <Header as="h3">Secondary Skills</Header>
                  <Field
                    name={'secondary'}
                    component={this.secondarySkillsInput}
                  />
                </div>}
              {this.state.typeInterview === 'tech' &&
                <div className="item-with-label">
                  <Header as="h3">Other skills</Header>
                  <Field name={'other'} component={this.otherSkillsInput} />
                </div>}
              {this.state.typeInterview === 'HR' &&
                <div className="item-with-label">
                  <Divider />
                  <Header as="h3">Communication Skills</Header>
                  <Field name={'hr'} component={this.hrSkillsInput} />
                </div>}
            </div>}

          <div className="add-interview">
            <Button type="button" onClick={reset}>
              reset data
            </Button>
            <Button primary disabled={submitting}>
              Send interview card
            </Button>
          </div>
        </Segment>
      </form>
    );
  }
}

export default reduxForm({ form: 'addInterview', validate })(
  InterviewComponent
);
