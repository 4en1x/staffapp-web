import React from 'react';

import { connect } from 'react-redux';
import ListComponent from '../../components/list/list.component';
import HistoryListItem from '../../components/list/list-items/history-list-item';

import HistoryFilter from './components/filter/history-filter.container';
import SemanticLoader from '../../components/loaders/semantic-loader';
import { getHistoryList } from './history-actions';
import { Table, Label, Header } from 'semantic-ui-react';
import './history-list-page.css';

class HistoryPage extends React.Component {
  componentDidMount() {
    this.props.getHistoryList(this.props.filter);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    console.log(this.props);
    if (this.props.filter !== nextProps.filter) {
      console.log('lallalal');
      this.props.getHistoryList(nextProps.filter);
    }
  }

  render() {
    console.log(this.props.history);

    if (!this.props.history) return <SemanticLoader />;

    return (
      <div className="history-page_content">
        <div className="history-table-page">
          <Table basic="very">
            <Table.Body>
              {this.props.history.map(item => {
                let chooseColor = '',
                  structData,
                  preview;
                if (item.event === 'create') chooseColor = 'green';
                else if (item.event === 'update') chooseColor = 'purple';
                else if (item.event === 'delete') chooseColor = 'red';
                else chooseColor = 'grey';

                if (item.logs.indexOf('data: {') !== -1) {
                  structData = item.logs.slice(65, item.logs.length - 2);
                  structData = structData.replace(/\"/gi, ' ');
                  preview = item.logs.slice(0, 64);
                }

                return (
                  <Table.Row>
                    <Table.Cell>
                      <Label color={chooseColor} horizontal>
                        {item.event}
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      {!structData &&
                        <Header as="h3">
                          {item.logs}
                        </Header>}
                      {structData &&
                        <div>
                          <Header as="h3">
                            {preview}
                          </Header>
                          {structData}
                        </div>}
                    </Table.Cell>
                    <Table.Cell>
                      <Label tag>
                        {item.role}
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Header as="h2" textAlign="center">
                        <Header.Content>
                          <div className="date-output">
                            {item.time}
                          </div>
                          <Header.Subheader>
                            <div className="date-output">
                              {item.date}
                            </div>
                          </Header.Subheader>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
        <div className="content-right">
          <HistoryFilter />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    history: state.history.historyList,
    filter: state.history.filter
  };
};

export default connect(mapStateToProps, { getHistoryList })(HistoryPage);
