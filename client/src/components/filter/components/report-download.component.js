import React from 'react';
import { connect } from 'react-redux';

class ReportDownloadComponent extends React.Component {
  render() {
    return (
      <div style={{display: 'none'}}>
        <iframe src={this.props.reportLink}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reportLink: state.candidate.reportLink,
  }
}

export default connect(mapStateToProps)(ReportDownloadComponent);
