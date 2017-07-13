import React from "react";
import './candidate-list-item.css'

import { Segment } from 'semantic-ui-react'

export default class CandidateListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Segment className="candidate-item-content">
                <div className="content-top">
                    <div className="name-label"> candidate name </div>
                    <div className="status-label"> status </div>
                </div>
                <div className="technology"> major technology </div>
                <div className="content-extra">
                    <div> city </div>
                    <div> time </div>
                </div>
            </Segment>
            );
    }
}