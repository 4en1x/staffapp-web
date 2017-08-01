import React from 'react';
import { connect } from 'react-redux';
import ListComponent from '../../components/list/list.component';
import HistoryListItem from '../../components/list/list-items/history-list-item';
import SemanticLoader from '../../components/loaders/semantic-loader';
import { getHistoryList } from './history-actions';
import './history-list-page.css';

class HistoryPage extends React.Component {
  componentDidMount() {
    this.props.getHistoryList();
  }

  render() {

    console.log(this.props.history);

    if (!this.props.history) return <SemanticLoader/>;

    return (
      <div className="history-list-page">
        <ListComponent listItem={HistoryListItem} elements={this.props.history} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    history: state.history.historyList
  };
};

export default connect(mapStateToProps, { getHistoryList })(HistoryPage);
