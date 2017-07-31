import React from "react";
import "./hiring-page.component.css";
import { Button, Segment, Divider, Header, Table } from "semantic-ui-react";
import CustonSearch from "./search";

let data = [
  {
    place: "Minsk",
    userNames: ["Anatoliy", "Vselovod"],
    date: "2014-03-03",
    type: "tech",
    fields: [
      { name: "c++", type: "tech", typeSkill: "minor" },
      { name: "java", type: "tech", typeSkill: "minor" },
      { name: "JavaScript", type: "tech", typeSkill: "minor" },
      { name: "angular", type: "tech", typeSkill: "minor" }
    ]
  },
    {
        place: "Minsk",
        userNames: ["Anatoliy", "Vselovod"],
        date: "2014-03-03",
        type: "tech",
        fields: [
            { name: "c++", type: "tech", typeSkill: "minor" },
            { name: "JavaScript", type: "tech", typeSkill: "minor" },
            { name: "angular", type: "tech", typeSkill: "minor" }
        ]
    },
    {
        place: "Minsk",
        userNames: ["Anatoliy", "Vselovod"],
        date: "2014-03-03",
        type: "tech",
        fields: [
            { name: "c++", type: "tech", typeSkill: "minor" },
            { name: "java", type: "tech", typeSkill: "minor" },
            { name: "angular", type: "tech", typeSkill: "minor" }
        ]
    },
    {
        place: "Minsk",
        userNames: ["Anatoliy", "Vselovod"],
        date: "2014-03-03",
        type: "tech",
        fields: [
            { name: "java", type: "tech", typeSkill: "minor" },
            { name: "JavaScript", type: "tech", typeSkill: "minor" },
            { name: "angular", type: "tech", typeSkill: "minor" }
        ]
    },
    {
        place: "Minsk",
        userNames: ["Anatoliy", "Vselovod"],
        date: "2014-03-03",
        type: "tech",
        fields: [
            { name: "c++", type: "tech", typeSkill: "minor" },
            { name: "java", type: "tech", typeSkill: "minor" },
            { name: "JavaScript", type: "tech", typeSkill: "minor" },
        ]
    }

];

let tempCandidate = "Jack";

export default class HiringComponent extends React.Component {

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
          <Segment className="content-description" raised>
            <div className="item-with-label">
              <Header as="h3">Vacancy</Header>
              <CustonSearch
                input={{ icon: "search", iconPosition: "left" }}
                onDataChange={data => {
                  tempCandidate = data;
                }}
                currentValue={tempCandidate}
              />
            </div>
            <Divider />

              {data.length !== 0 &&
              <Table striped>
                <Table.Body>
                    {data.map(step => {
                        let nameUsers = "";
                        let technologies = "";

                        step.userNames.map(
                            step =>
                                (nameUsers = nameUsers + step + " / ")
                        );
                        step.fields.map(
                            step => (technologies = technologies + step.name + " / ")
                        );

                        if (nameUsers.length !== 0)
                            nameUsers = nameUsers.slice(0, nameUsers.length - 3);
                        if (technologies.length !== 0)
                            technologies = technologies.slice(0, technologies.length - 3);
                        return (
                            <Table.Row key={nameUsers+technologies+step.date} >
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
              </Table>
              }
            <div className="add-interview">
              <Button primary>add interview</Button>
            </div>
          </Segment>
        </div>
      </div>
    );
  }
}
