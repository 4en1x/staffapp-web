import React from "react";
import "./hiring-page.component.css";
import {
  Button,
  Segment,
  Divider,
  Header,
  Table,
  Icon
} from "semantic-ui-react";
import InterviewComponent from "../../components/interview-add-edit-forms/interview.component";

//////////////////////////////////////////////////////////////////////////////////////////////////////
import { createStore, combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import { Provider } from "react-redux";

const reducer = combineReducers({
  form: reduxFormReducer // mounted under "form"
});
const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer);
//////////////////////////////////////////////////////////////////////////////////////////////////////

let skillList = {
  primary: ["one", "two", "three"],
  secondary: ["one", "two", "three"],
  other: ["one", "two", "three"],
  hr: ["one", "two", "three"]
};
let users = [
    {
    name: "Nick",
    role: "HRM",
    email: "nzHRM@gmail.com",
    id: "1"
},
    {
        name: "James",
        role: "Worker",
        email: "nzWorker@gmail.com",
        id: "2"
    },
    {
        name: "Jastin",
        role: "Admin",
        email: "nzWorker@gmail.com",
        id: "3"
    },
    {
        name: "Jacobs",
        role: "Worker",
        email: "nzWorker@gmail.com",
        id: "4"
    },
    {
        name: "Tomas",
        role: "Admin",
        email: "nzAdmin@gmail.com",
        id: "5"
    }];

export default class HiringComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
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
      })

      console.log(data);
  }

  render() {
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
              <Provider store={store}>
                <InterviewComponent
                  onSubmit={this.showResults}
                  skillsList={skillList}
                  users = {users}
                />
              </Provider>
            </div>

            <div className="content-right">
              <Segment className="segment-table-height">
                {this.state.data.length !== 0 &&
                  <Table basic="very">
                    <Table.Body>
                      {this.state.data.map(step => {
                        let nameUsers = "";
                        let technologies = "";
                        if(step.userNames)
                        step.userNames.map(
                          step => (nameUsers = nameUsers + step + " / ")
                        );
                        step.fields.map(
                          step =>
                            (technologies = technologies + step.name + " / ")
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
                onclick={this.sendData()}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
