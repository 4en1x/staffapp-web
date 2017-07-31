import React from "react";
import {
  Segment,
  Divider,
  Header,
  Icon,
  List,
  Accordion,
  Button
} from "semantic-ui-react";
import CommunicationsList from "./communications-list";
import Contacts from "./contacts-list";
import SkillsList from "./skills-list";
import "./candidate.css";
import ListComponent from "../../components/list/list.component";
import InterviewListItem from "../../components/list/list-items/interview-list-item";

export default class Candidate extends React.Component {
  render() {
    let otherLinks = "";
    this.props.data.contacts.links.map(
      step => (otherLinks = otherLinks + step + " / ")
    );
    if (otherLinks.length !== 0)
      otherLinks = otherLinks.slice(0, otherLinks.length - 3);
    return (
      <div className="candidate-detail-page">
        <div className="content">
          <div className="content-top">
            <div className="data-top">
              <Header as="h2" className="name-label">
                candidate detail page
              </Header>
            </div>
            <Divider />
          </div>

          <div className="main-form">
            <div className="segment-location">
              <Segment className="content-description" raised>
                <div className="first-form-line">
                  <div className="name-form-block">
                    <div className="label-info"> Main </div>
                    <List>
                      <List.Item>
                        <div className="item-with-label">
                          name
                          <div className="email-font-size">
                            {this.props.data.name}
                          </div>
                        </div>
                      </List.Item>
                      <List.Item>
                        <div className="item-with-label">
                          surname
                          <div className="email-font-size">
                            {this.props.data.surname}
                          </div>
                        </div>
                      </List.Item>
                      <List.Item>
                        <div className="item-with-label">
                          primary skill
                          <div className="email-font-size">
                            {this.props.data.skills.primarySkill}
                          </div>
                        </div>
                      </List.Item>
                      <List.Item>
                        <div className="item-with-label">
                          Year started with primary skill
                          <div className="email-font-size">
                            {this.props.data.skills.primarySkillYearStart}
                          </div>
                        </div>
                      </List.Item>
                      <List.Item>
                        <div className="item-with-label">
                          status
                          <div className="email-font-size">
                            {this.props.data.status}
                          </div>
                        </div>
                      </List.Item>
                    </List>
                  </div>

                  <div className="contacts-form-block">
                    <div className="label-info"> Contacts </div>
                    <Contacts data={this.props.data} />
                  </div>
                </div>

                <div className="second-form-line">
                  <div className="skill-form-block">
                    <div className="label-info"> Skills </div>
                    <SkillsList data={this.props.data} />
                  </div>

                  <div className="communication-form-block">
                    <div className="label-info"> Communication </div>
                    <CommunicationsList data={this.props.data} />
                  </div>
                </div>

                <div className="pudding-other-links">
                  <div className="label-info"> Other links </div>
                  <div className="theard-form-line">
                    <div className="email-font-size">
                      {" "}{otherLinks}{" "}
                    </div>
                  </div>
                </div>
              </Segment>
            </div>

            <div className="candidate-detail-page_accordion">
              <Button primary> add hiring </Button>

              {/*{this.props.data.hirings.map(hiring =>*/}
              {/*<Accordion>*/}
              {/*<Accordion.Title>*/}
              {/*{hiring.id}*/}
              {/*</Accordion.Title>*/}
              {/*<Accordion.Content>*/}
              {/*<ListComponent*/}
              {/*listItem={InterviewListItem}*/}
              {/*elements={this.props.data.hirings[0].interviews}*/}
              {/*url={`/interviews`}*/}
              {/*styles={{ width: "100%" }}*/}
              {/*/>*/}
              {/*</Accordion.Content>*/}
              {/*</Accordion>*/}
              {/*)}*/}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
