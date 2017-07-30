import React from 'react';
import Candidate from './components/candidate';

export default class CandidatePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false
    };
  }

  componentDidMount() {
    this.setState({ isLoaded: true });
  }

  render() {
    return (
      <div className="candidate-page">
        {this.state.isLoaded ? <Candidate /> : <p>not found</p>}
      </div>
    );
  }
}
