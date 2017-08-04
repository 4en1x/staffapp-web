import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Segment,
  Divider,
  Header,
  Table,
  Icon
} from 'semantic-ui-react';
import SemanticLoader from '../../components/loaders/semantic-loader';
import InterviewComponent from '../../components/interview-add-edit-forms/interview.component';
import { getFillList } from '../interview/interview-actions';
import { postHiring, resetHiring } from './hiring-actions';
import './hiring-page.component.css';

class HiringComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.props.getFillList();
  }

  showResults = values => {
    const data = this.state.data.slice();
    data.push(values);
    this.setState({ data });
  };

  sendData = () => {
    const data = this.state.data.slice();
    data.map(item => {
      delete item.userNames;
    });

    this.props.postHiring({ candidateId: 257, interviews: data });
  };

  componentWillUnmount() {
    this.props.resetHiring();
  }

  render() {
    if (this.props.isUploaded) return <Redirect to={`/candidates/`} />;

    return (
      <div className="interview-detail-page">
        <div className="interview-content">
          <div className="content-top">
            <div className="data-top">
              <Header as="h2" className="name-label">
                hiring page
              </Header>
            </div>
            <Divider />
          </div>

          <div className="hr-page_content">
            <div className="content-left">
              {this.props.formValues
                ? <InterviewComponent
                    onSubmit={this.showResults}
                    skillsList={this.props.formValues}
                    users={this.props.formValues.users}
                  />
                : <SemanticLoader/>}
            </div>

            <div className="content-right">
              <Segment className="segment-table-height">
                {this.state.data.length !== 0 &&
                  <Table basic="very">
                    <Table.Body>
                      {this.state.data.map(step => {
                        let nameUsers = '';
                        let technologies = '';
                        if (step.userNames)
                          step.userNames.map(
                            step => (nameUsers = nameUsers + step + ' / ')
                          );
                        step.fields.map(
                          step =>
                            (technologies = technologies + step.name + ' / ')
                        );

                        if (nameUsers.length !== 0)
                          nameUsers = nameUsers.slice(0, nameUsers.length - 3);
                        if (technologies.length !== 0)
                          technologies = technologies.slice(
                            0,
                            technologies.length - 3
                          );
                        return (
                          <Table.Row key={nameUsers + technologies + step.date}>
                            <Table.Cell>
                              {step.type}
                            </Table.Cell>

                            <Table.Cell>
                              {nameUsers}
                            </Table.Cell>
                            <Table.Cell>
                              {technologies}
                            </Table.Cell>

                            <Table.Cell>
                              {step.date}
                            </Table.Cell>
                            <Table.Cell>
                              {step.place}
                            </Table.Cell>
                          </Table.Row>
                        );
                      })}
                    </Table.Body>
                  </Table>}
                {this.state.data.length == 0 &&
                  <div className="margin-top-icon">
                    <Header as="h2" icon disabled textAlign="center">
                      <Icon name="settings" />
                      No interviews
                      <Header.Subheader>
                        Yoy can add interview, using add interview form
                      </Header.Subheader>
                    </Header>
                  </div>}
              </Segment>
              <Button
                className="add-button"
                fluid
                content="add interview"
                icon="add"
                labelPosition="left"
                color="twitter"
                type="button"
                onClick={this.sendData}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isUploaded: state.hiring.isUploaded,
    formValues: state.interview.formValues
  };
};

export default connect(mapStateToProps, {
  postHiring,
  resetHiring,
  getFillList
})(HiringComponent);
