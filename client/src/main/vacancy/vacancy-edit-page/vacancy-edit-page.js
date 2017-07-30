import React from 'react';
import VacancyComponent from '../../../components/vacancy-add-edit-forms/vacancy';
import vacancyService from '../../../service/vacancy-service';

const minorSkills = [
  {
    name: 'js',
    weight: 2
  },
  {
    name: 'java',
    weight: 2
  },
  {
    name: 'c++',
    weight: 2
  },
  {
    name: 'html',
    weight: 2
  }
];
const majorSkills = ['Angular', 'ReactJS', 'NodeJS', 'MongoBD', 'Hadoop'];
const cities = ['pinsk', 'minsk', 'dobrush', 'borisov'];
const statuses = ['on hold', 'die', 'live', 'was born'];
const data = {
  id: 1,
  name: 'job in exadel',
  status: 'on hold',
  jobStart: '03/06/2009',
  salary: '5000',
  primarySkill: 'ReactJS',
  description: 'description 1',
  city: 'minsk',
  skills: [
    {
      name: 'js',
      weight: 2
    },
    {
      name: 'java',
      weight: 2
    },
    {
      name: 'c++',
      weight: 2
    }
  ]
};

export default class InterviewPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false
    };
  }
  componentDidMount() {
    vacancyService.getVacancyById(this.props.match.params.id).then(res => {
      this.vacancy = res.data;
      vacancyService.getVacancyFillList().then(res => {
        this.lists = res.data;
        console.log(this.lists);
        this.setState({isLoaded: true});
      })
    });
  }

  showResults = values => {
    window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  };

  render() {
    // const url = this.props.match.url;
    // if (this.state.feedbackClicked) return <Redirect to={`${url}/feedback`} />;
    return (
      <div className="edit-vacancy-page">
        {!this.state.isLoaded
          ? <p>Not Loaded</p>
          : <VacancyComponent
              onSubmit={this.showResults}
              minorSkills={this.lists.secondarySkills}
              majorSkills={this.lists.primarySkills}
              data={this.vacancy}
              cities={this.lists.cities}
              statuses={this.lists.statuses}
            />}
      </div>
    );
  }
}
