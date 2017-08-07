import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Header, Icon, Label, Table } from 'semantic-ui-react';
import SemanticLoader from '../../components/loaders/semantic-loader';
import InterviewComponent from '../../components/interview-add-edit-forms/interview.component';
import { postHiring, resetHiring, getFormValues } from './hiring-actions';

const peoples = [];
class HiringComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.props.getFormValues();
  }
  componentWillUnmount() {
    this.props.resetHiring();
  }

  showResults = values => {
    let technologies = '';
    values.fields.forEach(
      field => (technologies = `${technologies + field.name} `)
    );
    peoples.push(technologies);

    const data = this.state.data.slice();
    data.push(values);
    this.setState({ data });
  };

  sendData = () => {
    const data = this.state.data.slice();
    data.map(item => {
      delete item.userNames;
    });
    this.props.postHiring({ candidateId: this.props.id, interviews: data });
  };

  render() {
    if (this.props.isUploaded)
      return <Redirect to={`/candidates/${this.props.id}`} />;
    return (
      <div className="hiring-page">
        <div className="page-content">
          <div className="content-left">
            {this.props.formValues
              ? <InterviewComponent
                  onSubmit={this.showResults}
                  skillsList={this.props.formValues}
                />
              : <SemanticLoader />}
          </div>

          <div className="content-right">
            {this.state.data.length !== 0 &&
              <Table basic="very">
                <Table.Body>
                  {this.state.data.map((interviewLine, move) =>
                    <Table.Row
                      key={
                        interviewLine.type +
                        interviewLine.time +
                        interviewLine.date
                      }
                    >
                      <Table.Cell>
                        {interviewLine.type === 'HR' &&
                          <Label color="green" horizontal content="HR" />}
                        {interviewLine.type === 'tech' &&
                          <Label color="orange" horizontal content="tech" />}
                        {interviewLine.type === 'owner' &&
                          <Label color="violet" horizontal content="owner" />}
                      </Table.Cell>
                      <Table.Cell>
                        {interviewLine.userNames.join(' ')}
                      </Table.Cell>
                      <Table.Cell>
                        {peoples[move]}
                      </Table.Cell>
                      <Table.Cell>
                        {interviewLine.date}
                      </Table.Cell>
                      <Table.Cell>
                        {interviewLine.place &&
                          <Label tag content={interviewLine.place} />}
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table>}
            {this.state.data.length === 0 &&
              <div className="margin-top-icon">
                <Header as="h2" icon disabled textAlign="center">
                  <Icon name="sticky note outline" />
                  No interviews
                  <Header.Subheader>
                    Yoy can add interview, using add interview form
                  </Header.Subheader>
                </Header>
              </div>}
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
    );
  }
}

const mapStateToProps = state => {
  return {
    isUploaded: state.hiring.isUploaded,
    formValues: state.hiring.formValues,
    id: state.candidate.currentCandidate.id
  };
};

export default connect(mapStateToProps, {
  postHiring,
  resetHiring,
  getFormValues
})(HiringComponent);
