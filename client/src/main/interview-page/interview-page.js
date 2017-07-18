import React from 'react';
import InterviewComponent from './components/interview.component';

import './interview-page.css';

const data = {
  id: '1',
  skills: ["skill 1", "skill 2", "skill 3", "skill 4"],
  candidate: "Sergey Moiseenko",
  status: "status: Free",
  location: "Minsk",
  feedbacks: [
    [
      {
        technology: "JavaScript",
        grade: "5"
      },
      {
        technology: "c++",
        grade: "2"
      },
      {
        technology: "pithon",
        grade: "7"
      },
      {
        technology: ".net",
        grade: "5"
      },
      {
        technology: "angular",
        grade: "9"
      }
    ],
    [
      {
        technology: "JavaScript",
        grade: "6"
      },
      {
        technology: "c++",
        grade: "9"
      },
      {
        technology: "pithon",
        grade: "2"
      },
      {
        technology: ".net",
        grade: "4"
      },
      {
        technology: "angular",
        grade: "7"
      }
    ],
    [
      {
        technology: "JavaScript",
        grade: "5"
      },
      {
        technology: "c++",
        grade: "2"
      },
      {
        technology: "pithon",
        grade: "7"
      },
      {
        technology: ".net",
        grade: "5"
      },
      {
        technology: "angular",
        grade: "9"
      }
    ],
    [
      {
        technology: "JavaScript",
        grade: "9"
      },
      {
        technology: "c++",
        grade: "3"
      },
      {
        technology: "pithon",
        grade: "6"
      },
      {
        technology: ".net",
        grade: "7"
      },
      {
        technology: "angular",
        grade: "8"
      }
    ],
    [
      {
        technology: "JavaScript",
        grade: "10"
      },
      {
        technology: "c++",
        grade: "3"
      },
      {
        technology: "pithon",
        grade: "6"
      },
      {
        technology: ".net",
        grade: "3"
      },
      {
        technology: "angular",
        grade: "2"
      }
    ]
  ],
  authorFeedback: ["mr.HR", "mrsHR", "mlle.Worker", "mst.Worker", "ll.HR"],
  user: {
    name: "Nick",
    surname: "Zabolotskiy"
  }
};

export default class InterviewPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      interview: null,
      isLoaded: false
    };

    console.log('lalala');
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    this.setState({interview: data, isLoaded: true});
  }

  render() {
    return (
    <div className="interview-page">
      {!this.state.isLoaded? <p>Not Loaded</p> : <InterviewComponent interview={this.state.interview} />}
    </div>
    )
  }
}
