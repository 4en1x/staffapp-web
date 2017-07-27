import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import FeedbackView from './components/feedback-view';
import { getFeedbackFormFields, putFeedback } from './feedback-actions';
import SemanticLoader from '../../components/loaders/semantic-loader';

class FeedbackPage extends React.Component {
  componentDidMount() {
    this.props.getFeedbackFormFields(this.props.match.params.id);
  }

  onSubmitClicked = feedback => {
    this.props.putFeedback(this.props.match.params.id, feedback);
  };

  render() {
    if (this.props.isFeedbackUploaded) return <Redirect to="/" />;

    return (
      <div>
        {!this.props.fields
          ? <SemanticLoader />
          : <FeedbackView
          data={this.props.fields}
          onSubmitClicked={this.onSubmitClicked}
        />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fields: state.feedback.feedbackFields,
  isFeedbackUploaded: state.feedback.isUploaded
});

export default connect(mapStateToProps, { getFeedbackFormFields, putFeedback })(
  FeedbackPage
);
