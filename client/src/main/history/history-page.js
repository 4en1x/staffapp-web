import React from 'react';
import { connect } from 'react-redux';
import { Table, Label, Header, Button } from 'semantic-ui-react';
import ListComponent from '../../components/list/list.component';
import HistoryListItem from '../../components/list/list-items/history-list-item';
import HistoryFilter from './components/filter/history-filter.container';
import SemanticLoader from '../../components/loaders/semantic-loader';
import roles from '../../config/config';
import { getHistoryList } from './history-actions';
import './history-list-page.css';

let counter = 1;
class HistoryPage extends React.Component {
  componentDidMount() {
    this.props.getHistoryList(this.props.filter, 1);
      counter =1;
  }

    nextPage = () => {
        if(counter<this.props.history.pagesAmount) this.props.getHistoryList( this.props.filter, ++counter )
    }
    lastPage = () => {
        if(counter>1) this.props.getHistoryList( this.props.filter, --counter )
    }

  componentWillReceiveProps(nextProps) {
    if (this.props.filter !== nextProps.filter) {
      this.props.getHistoryList(nextProps.filter, 2);
    }
  }

  render() {
    if (!this.props.history) return <SemanticLoader />;

    return (
      <div className="page-content">
        <div className="content-left">
          <Table basic="very">
            <Table.Body>
              {this.props.history.data.map(item => {
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
                  <Button.Group size="large" floated="right">
                  {counter === 1 && <Button disabled content="previous page" />}
                  {counter !== 1 && <Button onClick={this.lastPage} content="previous page" />}
                  <Button.Or text={counter} />
                  {counter === this.props.history.pagesAmount &&
                  <Button primary disabled content="next page" />}
                  {counter !== this.props.history.pagesAmount &&
                  <Button primary onClick={this.nextPage} content="next page" />}
                  </Button.Group>
        </div>
        <div className="content-right">
          {this.props.role === roles.ADMIN.ROLE ? <HistoryFilter /> : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    history: state.history.historyList,
    filter: state.history.filter,
    role: state.auth.role
  };
};

export default connect(mapStateToProps, { getHistoryList })(HistoryPage);
