import React from 'react';
import { connect } from 'react-redux';
import { resetLink } from '../../../main/candidate/candidate-actions';

class ReportDownloadComponent extends React.Component {
  componentWillUnmount() {
    
    this.props.resetLink();
  }

  render() {
    console.log(this.props.reportLink);

    if (!this.props.reportLink) return null;

    return (
      <div style={{ display: 'none' }}>
        <iframe src={this.props.reportLink} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reportLink: state.candidate.reportLink
  };
}

export default connect(mapStateToProps, { resetLink })(ReportDownloadComponent);
