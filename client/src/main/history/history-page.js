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
  }

    nextData = () => {
        counter++;
        this.props.getHistoryList(this.props.filter, counter);
    };

    prevData = () => {
        if (counter > 1) {
            counter--;
            this.props.getHistoryList(this.props.filter, counter);
        }
    };

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
                  <Button.Group size='large' floated="right">
                  <Button onClick={this.prevData}> last page </Button>
                  <Button.Or text={counter} />
                  <Button primary onClick={this.nextData}> next page</Button>
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
