import React from "react";
import './interview-page.css'
import FeedbackList from './components/feedback-list'
import Header from '../../components/header/header.components'

import { Search } from 'semantic-ui-react'
import { Divider } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import { List } from 'semantic-ui-react'
import { Label } from 'semantic-ui-react'
import { Segment } from 'semantic-ui-react'


const data = {
    skills : ["skill 1","skill 2","skill 3","skill 4"],
    candidate: "Sergey Moiseenko",
    status: "status: Free",
    location : "Minsk",
    feedbacks : [
        [
            {
                tecknology: "JavaScript",
                grade: "5"
            },
            {
                tecknology: "c++",
                grade: "2"
            },
            {
                tecknology: "pithon",
                grade: "7"
            },
            {
                tecknology: ".net",
                grade: "5"
            },
            {
                tecknology: "angular",
                grade: "9"
            }

        ],
        [
            {
                tecknology: "JavaScript",
                grade: "6"
            },
            {
                tecknology: "c++",
                grade: "9"
            },
            {
                tecknology: "pithon",
                grade: "2"
            },
            {
                tecknology: ".net",
                grade: "4"
            },
            {
                tecknology: "angular",
                grade: "7"
            }

        ],
        [
            {
                tecknology: "JavaScript",
                grade: "5"
            },
            {
                tecknology: "c++",
                grade: "2"
            },
            {
                tecknology: "pithon",
                grade: "7"
            },
            {
                tecknology: ".net",
                grade: "5"
            },
            {
                tecknology: "angular",
                grade: "9"
            }

        ],
        [
            {
                tecknology: "JavaScript",
                grade: "9"
            },
            {
                tecknology: "c++",
                grade: "3"
            },
            {
                tecknology: "pithon",
                grade: "6"
            },
            {
                tecknology: ".net",
                grade: "7"
            },
            {
                tecknology: "angular",
                grade: "8"
            }

        ],
        [
            {
                tecknology: "JavaScript",
                grade: "10"
            },
            {
                tecknology: "c++",
                grade: "3"
            },
            {
                tecknology: "pithon",
                grade: "6"
            },
            {
                tecknology: ".net",
                grade: "3"
            },
            {
                tecknology: "angular",
                grade: "2"
            }

        ]
    ],
    authorFeedback : ["mr.HR","mrsHR","mlle.Worker","mst.Worker","ll.HR"],
    user : {
        name: 'Nick',
        surname: 'Zabolotskiy'
    }
}

export default class InterviewPageComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSearchChange = (e, value) => { console.log(value.value); }
    addFeedback = () => { console.log("Feedback was sent"); }

    render() {
        return (
            <div >
                <Header user={data.user}/>

                <div className="title">
                    <div className="candidateTitle"> {data.candidate} </div>
                    <Search onSearchChange={this.handleSearchChange} />
                </div>

                <Divider />

                <Segment id="content">

                    <Label as='a' color='teal' ribbon='right' size="huge"> data.status </Label>

                    <List size="huge">
                        <List.Item>
                            <List.Header>Skills</List.Header>
                            <List items={ data.skills} />
                        </List.Item>

                         <List.Item>
                            <List.Header>Location</List.Header>
                            {data.location}
                         </List.Item>

                          <List.Item>
                            <List.Header>Feedbacks</List.Header>
                            <FeedbackList feedbacks={data.feedbacks} authorFeedback={data.authorFeedback}/>
                          </List.Item>
                    </List>
                </Segment>

                <div className="addFeedback">
                    <Button primary  onClick={() => data.addFeedback()}> Feedback </Button>
                </div>
            </div>
        );
    }
}



