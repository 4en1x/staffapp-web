import React from "react";
import {
  Segment,
  Label,
  List,
  Button,
  Divider,
  Search
} from "semantic-ui-react";
import "./interview-page.css";
import FeedbackList from "./components/feedback-list";

const data = {
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

export default class InterviewPageComponent extends React.Component {
  handleSearchChange = () => {
    // TODO: ... some action needed ...
  };
  addFeedback = () => {
    // TODO: ... some action needed ...
  };

  render() {
    return (
      <div>
        <div className="title">
          <div className="candidate-title">
            {data.candidate}
          </div>
          <Search onSearchChange={this.handleSearchChange} />
        </div>

        <Divider />

        <Segment id="content">
          <Label as="a" color="teal" ribbon="right" size="huge">
            {data.status}
          </Label>

          <List size="huge">
            <List.Item>
              <List.Header>Skills</List.Header>
              <List items={data.skills} />
            </List.Item>

            <List.Item>
              <List.Header>Location</List.Header>
              {data.location}
            </List.Item>

            <List.Item>
              <List.Header>Feedbacks</List.Header>
              <FeedbackList
                feedbacks={data.feedbacks}
                authorFeedback={data.authorFeedback}
              />
            </List.Item>
          </List>
        </Segment>

        <div className="add-feedback">
          <Button primary onClick={this.addFeedback}>
            Feedback
          </Button>
        </div>
      </div>
    );
  }
}
