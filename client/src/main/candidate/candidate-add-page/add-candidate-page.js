import React from 'react';
import Candidate from '../../../components/candidate-add-edit-forms/list/candidate';
import candidateService from '../../../service/candidate-service';

///////////// for testing
const majorSkills = ['C++', 'Android', 'PHP', 'Python', 'iOS'];
const minorSkills = ['Angular', 'ReactJS', 'NodeJS', 'MongoBD', 'Hadoop'];
const statuses = ['live', 'die', 'was born', 'pool'];
const cities = ['Minsk', 'Pinsk', 'Dobrush', 'Borisov'];
/////////////////////////

export default class AddCandidatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoaded: false };
  }

  componentDidMount() {

    candidateService.getCandidatesFillList().then(res => {
      this.lists = res.data;
      this.setState({ isLoaded: true });
    });
  }
  showResults = values => {
    window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  };

  render() {
    return (
      <div className="candidate-page">
        {this.state.isLoaded
          ? <Candidate
              majorSkills={this.lists.primarySkills}
              minorSkills={this.lists.secondarySkills}
              statuses={this.lists.statuses}
              cities={this.lists.cities}
              onSubmit={this.showResults}
            />
          : <p>not found</p>}
      </div>
    );
  }
}
