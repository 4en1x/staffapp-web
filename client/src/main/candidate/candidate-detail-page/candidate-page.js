import React from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';
import SemanticLoader from '../../../components/loaders/semantic-loader';
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
        {this.state.isLoaded ? <Candidate /> : <SemanticLoader />}
      </div>
    );
  }
}
