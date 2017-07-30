import React from 'react';
import Candidate from './components/candidate';
import candidateService from '../../../service/candidate-service';

export default class CandidatePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false
    };
  }

  componentDidMount() {
    candidateService.getCandidateById(1).then(res => {
      this.candidate = res.data;
      this.setState({ isLoaded: true });
    });
  }

  render() {

    console.log(this.candidate);

    return (
      <div className="candidate-page">
        {this.state.isLoaded ? <Candidate candidate={this.candidate}/> : <p>not found</p>}
      </div>
    );
  }
}
