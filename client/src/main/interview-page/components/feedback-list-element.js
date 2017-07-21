import React from "react";
import './feedback-list-element.css'

import { List } from 'semantic-ui-react'
import { Message } from 'semantic-ui-react'

export default class FeedbackListElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            needOpen: false
        };
    }

    handleClick = () =>  {
        this.setState(prevState => ({
            needOpen: !prevState.needOpen
        }));
    };

    render() {
        return (
            <List.Item  onClick={this.handleClick}>
                <List.Header as='a'>{this.props.authorFeedback}</List.Header>
                { this.state.needOpen && this.props.feedback && <Message>
                    <List>
                        {this.props.feedback.map((step, move) => {
                            return (
                                <List.Item key = {move}>
                                    <div className="custom-content">
                                        <p>{step.technology} </p>
                                        <p>{step.grade}</p>
                                    </div>
                                </List.Item>
                            );
                        })}
                    </List>
                </Message>
                }
            </List.Item>
        );
    }
}