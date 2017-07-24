import React from "react";
import FeedbackTechnicalCard from "./components/add-technical-feedback-page.component.jsx";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../../action-creators/action-creators.js";
import SemanticLoader from "../../components/loaders/semantic-loader.js";

class TechnicalFeedback extends React.Component {
  componentDidMount() {
    this.props.getFeedbackFormFields(this.props.match.params.id);
  }

  addFeedback = feedback => {
    this.props.putFeedback(this.props.match.params.id, feedback);
  };

  render() {
    if (this.props.isFeedbackUploaded) return <Redirect to="/" />;

    return (
      <div>
        {!this.props.fields
          ? <SemanticLoader />
          : <FeedbackTechnicalCard
              data={this.props.fields}
              addFeedback={this.addFeedback}
            />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fields: state.feedback.feedbackFields,
  isFeedbackUploaded: state.feedback.isUploaded
});

export default connect(mapStateToProps, actionCreators)(TechnicalFeedback);
