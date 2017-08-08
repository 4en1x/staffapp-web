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
let hrSkillList = [];
let usersList = [];
let primarySkillList = [];
let secondarySkillList = [];
let otherSkillList = [];

const validate = values => {
  const errors = {};
  if (!values.type) errors.type = 'Required';
  if (!values.users) errors.users = 'Required';
  if (!values.date) errors.date = 'Required';
  if (!values.time) errors.time = 'Required';
  return errors;
};
class InterviewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeInterview: '',
      formIsClean: true,
    };
    this.initialData();
  }

  textareaWithIconField = ({
    input,
    placeholder,
    typeInput,
    icon,
    meta: { touched, error }
  }) => {
    return (
      <div className="field-with-warning">
        <Input
          {...input}
          type={typeInput}
          placeholder={placeholder}
          label={{ basic: true, content: <Icon name={icon} /> }}
          labelPosition="left"
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

  DropdownField = ({
    input,
    dataList,
    placeholder,
    meta: { touched, error }
  }) => {
    return (
      <div className="field-with-warning">
        <Dropdown
          value={input.value}
          onChange={(param, data) => {
            this.setState({ typeInterview: data.value }, () => {
              this.buildArrays();
            });
            input.onChange(data.value);
          }}
          search
          selection
          placeholder={placeholder}
          options={dataList}
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

  MultipleDropdownField = ({
    input,
    dataList,
    placeholder,
    meta: { touched, error }
  }) => {
    return (
      <div className="field-with-warning">
        <Dropdown
          selection
          value={input.value}
          onChange={(param, data) => {
            input.onChange(data.value);
          }}
          placeholder={placeholder}
          multiple
          search
          options={dataList}
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

  initialData = () => {
    if (this.props.skillsList.users)
      usersList =[];
      this.props.skillsList.users.map(item => {
        let colorLabel = 'grey';
        if (item.role === 'hr') colorLabel = 'orange';
        else if (item.role === 'admin') colorLabel = 'blue';
        else if (item.role === 'user') colorLabel = 'green';

        const temp = {
          key: item.id + ' ' + item.name + ' ' + item.email + ' ' + item.role,
          text: item.id + ' ' + item.name + ' ' + item.email + ' ' + item.role,
          value: item.id + ' ' + item.name + ' ' + item.email + ' ' + item.role,
          content: (
            <Header size="small">
              <Label
                size="big"
                color={colorLabel}
                vertical
                content={item.role}
              />
              <Header.Content>
                {item.name}
                <Header.Subheader>
                  {item.email}
                </Header.Subheader>
              </Header.Content>
            </Header>
          )
        };
        usersList.push(temp);
      });
    if (this.props.data) {
      let date = new Date(this.props.data.date);
        var mm = date.getMonth() + 1;
        var dd = date.getDate();
        window.alert([date.getFullYear(), (mm>9 ? '' : '0') + mm, (dd>9 ? '' : '0') + dd].join('-'));
      let initData = {
        place: this.props.data.place,
        date:[date.getFullYear(), (mm>9 ? '' : '0') + mm, (dd>9 ? '' : '0') + dd].join('-'),
        time: date.toTimeString().split(' ')[0].slice(0,5)
      };
      this.props.initialize(initData);
    }
  };
  buildArrays = () => {
    if (this.state.typeInterview === 'tech') {
        primarySkillList=[];
      this.props.skillsList.primary.map(item => {
        const temp = {
          key: item,
          text: item,
          value: item
        };
        primarySkillList.push(temp);
        return null;
      });
       secondarySkillList=[];
      this.props.skillsList.secondary.map(item => {
        const temp = {
          key: item,
          text: item,
          value: item
        };
        secondarySkillList.push(temp);
        return null;
      });
        otherSkillList=[];
      this.props.skillsList.other.map(item => {
        const temp = {
          key: item,
          text: item,
          value: item
        };
        otherSkillList.push(temp);
        return null;
      });
    } else if (this.state.typeInterview === 'HR') {
        hrSkillList=[];
      this.props.skillsList.hr.map(item => {
        const temp = {
          key: item,
          text: item,
          value: item
        };
        hrSkillList.push(temp);
        return null;
      });
    }
  };
  prepareData = value => {
    let data = {};
    data.place = value.place;
    data.users = [];
    data.date = value.date;
    data.time = value.time;
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
      value.users.forEach(item => {
        const arr = item.split(' ');
        data.users.push(Number(arr[0]));
        data.userNames.push(arr[1]);
      });
    }
    this.props.onSubmit(data);
    this.props.reset();
  };

  render() {
    const { reset, handleSubmit, submitting } = this.props;
    return (
      <div className="content-left">
      <form
        onSubmit={handleSubmit(this.prepareData.bind(this))}
        className="content-tab background padded"
      >
          <div className="item-with-label">
            <Header as="h3">Users *</Header>
            <Field
              name={'users'}
              placeholder="users"
              dataList={usersList}
              component={this.MultipleDropdownField}
            />
          </div>
          <Divider />
          <div className="item-with-label">
            <Header as="h3">Place</Header>
            <Field
              name={'place'}
              placeholder="place"
              typeInput="text"
              icon="university"
              component={this.textareaWithIconField}
            />
          </div>
          <Divider />
          <div className="item-with-label">
            <Header as="h3">Date *</Header>
            <div className="text-area">
              <Field
                name={'date'}
                typeInput="date"
                icon="calendar"
                component={this.textareaWithIconField}
              />
            </div>
            <Field
              name={'time'}
              typeInput="time"
              icon="clock"
              component={this.textareaWithIconField}
            />
          </div>

          {!this.props.data &&
            <div>
              <Divider />
              <div className="item-with-label">
                <Header as="h3">Type *</Header>
                <Field
                  name={'type'}
                  placeholder="interview type"
                  dataList={typeList}
                  component={this.DropdownField}
                />
              </div>
              {this.state.typeInterview === 'tech' &&
                <div className="item-with-label">
                  <Divider />
                  <Header as="h3">Primary skills</Header>
                  <Field
                    name={'primary'}
                    dataList={primarySkillList}
                    placeholder="primary skill"
                    component={this.MultipleDropdownField}
                  />
                </div>}
              {this.state.typeInterview === 'tech' &&
                <div className="item-with-label">
                  <Header as="h3">Secondary Skills</Header>
                  <Field
                    name={'secondary'}
                    dataList={secondarySkillList}
                    placeholder="secondary skill"
                    component={this.MultipleDropdownField}
                  />
                </div>}
              {this.state.typeInterview === 'tech' &&
                <div className="item-with-label">
                  <Header as="h3">Other skills</Header>
                  <Field
                    name={'other'}
                    dataList={otherSkillList}
                    placeholder="other skill"
                    component={this.MultipleDropdownField}
                  />
                </div>}
              {this.state.typeInterview === 'HR' &&
                <div className="item-with-label">
                  <Divider />
                  <Header as="h3">Communication Skills</Header>
                  <Field
                    name={'hr'}
                    dataList={hrSkillList}
                    placeholder="hr skill"
                    component={this.MultipleDropdownField}
                  />
                </div>}
            </div>}

          <div className="add-interview">
            <Button type="button" onClick={reset} content='reset data'/>
            <Button primary disabled={submitting}>
              Send interview card
            </Button>
          </div>
      </form>
      </div>
    );
  }
}

export default reduxForm({ form: 'addInterview', validate})(
  InterviewComponent
);
