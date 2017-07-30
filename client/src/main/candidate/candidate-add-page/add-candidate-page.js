import React from 'react';
import Candidate from '../../../components/candidate-add-edit-forms/candidate';

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
    this.setState({ isLoaded: true });
  }
  showResults = values => {
    window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  };

  render() {
    return (
      <div className="candidate-page">
        {this.state.isLoaded
          ? <Candidate
              majorSkills={majorSkills}
              minorSkills={minorSkills}
              statuses={statuses}
              cities={cities}
              onSubmit={this.showResults}
            />
          : <p>not found</p>}
      </div>
    );
  }
}
