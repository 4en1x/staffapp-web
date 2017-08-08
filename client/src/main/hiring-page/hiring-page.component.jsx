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
    let data = this.state.data.slice();
    data.forEach(item => {
      delete item.userNames;
      const dateItem = new Date(item.date + ' ' + item.time);
      item.date = dateItem.toISOString();
      delete item.time;
      return item;
    });

    let candidateId = this.props.candidateId;
    let vacancyId = this.props.vacancyId;
    if (candidateId === null) candidateId = Number(this.props.match.params.id);
    if (vacancyId === null) vacancyId = Number(this.props.match.params.id);

    console.log(this.props);
    console.log(vacancyId);
    console.log(candidateId);

    this.props.postHiring({
      candidateId: candidateId,
      vacancyId: vacancyId,
      interviews: data
    });
  };

  render() {

    if (this.props.isUploaded) {
      let id = this.props.vacancyId || this.props.candidateId;
      return <Redirect to={`/candidates/${id}`}/>;
    }
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
                        {interviewLine.type === 'client' &&
                          <Label color="violet" horizontal content="client" />}
                      </Table.Cell>
                      <Table.Cell>
                        {interviewLine.userNames.join(' ')}
                      </Table.Cell>
                      <Table.Cell>
                        {peoples[move]}
                      </Table.Cell>
                      <Table.Cell>
                        <Header as="h2" textAlign="center">
                          <Header.Content>
                            <div className="date-output">
                              {interviewLine.time}
                            </div>
                            <Header.Subheader>
                              <div className="date-output">
                                {interviewLine.date}
                              </div>
                            </Header.Subheader>
                          </Header.Content>
                        </Header>
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
    vacancyId: state.hiring.vacancyId,
    candidateId: state.hiring.candidateId
  };
};

export default connect(mapStateToProps, {
  postHiring,
  resetHiring,
  getFormValues
})(HiringComponent);
