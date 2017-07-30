import React from 'react';
import VacancyComponent from '../../../components/vacancy-add-edit-forms/vacancy';
import vacancyService from '../../../service/vacancy-service';

const data = {
  id: '1'
};

export default class AddVacancyPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false
    };
  }
  componentDidMount() {
    vacancyService.getAddFormValues().then(res => {
      this.value = res.data;
      vacancyService.getVacancyFillList().then(res => {
        this.lists = res.data;
        this.setState({isLoaded: true});
      })
    });
  }

  showResults = values => {
    window.alert(JSON.stringify(values));
    vacancyService.postVacancy(values).then(res => {
      console.log(res);
    })
  };

  render() {
    // const url = this.props.match.url;
    // if (this.state.feedbackClicked) return <Redirect to={`${url}/feedback`} />;
    return (
      <div className="vacancy-page">
        {!this.state.isLoaded
          ? <p>Not Loaded</p>
          : <VacancyComponent
              onSubmit={this.showResults}
              minorSkills={this.lists.secondarySkills}
              majorSkills={this.lists.primarySkills}
              cities={this.lists.cities}
              statuses={this.lists.statuses}
              data={data}
            />}
      </div>
    );
  }
}
