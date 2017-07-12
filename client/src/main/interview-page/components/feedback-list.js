import React from "react";
import FeedbackListElement from './feedback-list-element'

import { List } from 'semantic-ui-react'

export default class FeedbackList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <List divided relaxed>
                {this.props.feedbacks.map((step, move) => {
                    return (
                        < FeedbackListElement feedback={step} key={move} authorFeedback={this.props.authorFeedback[move]}/>
                    );
                })}
            </List>
        );
    }
}