import React from 'react';
import './interview.css';
import { Field, reduxForm } from 'redux-form';
import { Button, Dropdown, Segment, Divider, Header } from 'semantic-ui-react';
import CustonSearch from './search';

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
const citiesList = [];
const hrSkillList = [];
const primarySkillList = [];
const secondarySkillList = [];
const otherSkillList = [];

class InterviewComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      typeInterview: ''
    };
  }

  componentDidMount() {

    console.log('here');
    console.log(this.props.data);

    if (this.props.data) {
      this.setState({ typeInterview: this.props.data.type }, () => {
        this.buildArrays();
        let initData = {
          place: this.props.data.place,
          type: this.props.data.type,
          users: this.props.data.users,
          primary: [],
          secondary: [],
          other: [],
          hr: []
        };

        if (this.props.data.type === 'tech') {
          this.props.data.fields.map(item => {
            if (item.type === 'tech') {
              if (item.typeSkill === 'primary')
                initData.primary.push(item.name);
              if (item.typeSkill === 'secondary')
                initData.secondary.push(item.name);
              if (item.typeSkill === 'other') initData.other.push(item.name);
            }
          });
        } else if (this.props.data.type === 'HR') {
          this.props.data.fields.map(item => {
            initData.hr.push(item.name);
          });
        }

        this.props.initialize(initData);
      });
    }
  }

  getDataFromServer = value => {
    if (value === 'tech') {
      return {
        primary: ['primaryOne'],
        secondary: ['secondaryOne', 'secondaryTwo', 'secondaryThree'],
        other: ['otherOne', 'otherTwo', 'otherThree']
      };
    } else return { hr: ['something1', 'something2', 'something3'] };
  };
  buildArrays = () => {
    let value;
    if (this.state.typeInterview !== 'owner')
      value = this.props.skillsList;
    if (this.state.typeInterview === 'tech') {
      value.primary.map(step => {
        const temp = {
          key: step,
          text: step,
          value: step
        };
        primarySkillList.push(temp);
      });
      value.secondary.map(step => {
        const temp = {
          key: step,
          text: step,
          value: step
        };
        secondarySkillList.push(temp);
      });
      value.other.map(step => {
        const temp = {
          key: step,
          text: step,
          value: step
        };
        otherSkillList.push(temp);
      });
      return value.primary;
    } else if (this.state.typeInterview === 'HR') {
      value.hr.map(step => {
        const temp = {
          key: step,
          text: step,
          value: step
        };
        hrSkillList.push(temp);
      });
      return value.hr;
    }
  };

  nameInput = ({ input }) => {
    return (
      <CustonSearch
        input={{ icon: 'search', iconPosition: 'left' }}
        onDataChange={(param, data) => {
          input.onChange(data);
        }}
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
          console.log(data.value);
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
          console.log(data.value);
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
  /*cityInput = ({ input }) => {
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
  */
  typeSkillInput = ({ input }) => {
    return (
      <Dropdown
        placeholder="type of meeting"
        {...input}
        value={input.value}
        onChange={(param, data) => {
          this.setState({ typeInterview: data.value }, () => {
            console.log(data);
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
    data.hiringId = 2;
    data.type = value.type;
    data.place = value.place;
    data.users = value.users.map(user => Number(user));
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
                {!this.props.data && 'creating interview form'}
                {this.props.data && 'editing interview form'}
              </Header>
            </div>
            <Divider />
          </div>
          <Segment className="content-description" raised>
            <div className="item-with-label">
              <Header as="h3">Users</Header>
              <Field name={'users'} component={this.nameInput} />
            </div>
            <Divider />
            <div className="item-with-label">
              <Header as="h3">Place</Header>
            </div>
            <Divider />
            <div className="item-with-label">
              <Header as="h3">Type</Header>
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

export default reduxForm({ form: 'addInterview' })(InterviewComponent);
