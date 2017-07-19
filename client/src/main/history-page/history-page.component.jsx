import React from "react";
import { Segment, Table, Icon } from "semantic-ui-react";
import ReportFilter from "../../components/report-filter/report-filter.component";
import "./history-page.css";

const news = [
  {
    user: "User",
    description: "description",
    date: "date+time"
  },
  {
    user: "User",
    description: "description",
    date: "date+time"
  },
  {
    user: "User",
    description: "description",
    date: "date+time"
  },
  {
    user: "User",
    description: "description",
    date: "date+time"
  },
  {
    user: "User",
    description: "description",
    date: "date+time"
  },
  {
    user: "User",
    description: "description",
    date: "date+time"
  },
  {
    user: "User",
    description: "description",
    date: "date+time"
  },
  {
    user: "User",
    description: "description",
    date: "date+time"
  },
  {
    user: "User",
    description: "description",
    date: "date+time"
  },
  {
    user: "User",
    description: "description",
    date: "date+time"
  },
  {
    user: "User",
    description: "description",
    date: "date+time"
  },
  {
    user: "User",
    description: "description",
    date: "date+time"
  },
  {
    user: "User",
    description: "description",
    date: "date+time"
  },
  {
    user: "User",
    description: "description",
    date: "date+time"
  },
  {
    user: "User",
    description: "description",
    date: "date+time"
  },
  {
    user: "User",
    description: "description",
    date: "date+time"
  },
  {
    user: "User",
    description: "description",
    date: "date+time"
  },
  {
    user: "User",
    description: "description",
    date: "date+time"
  },
  {
    user: "User",
    description: "description",
    date: "date+time"
  },
  {
    user: "User",
    description: "description",
    date: "date+time"
  },
  {
    user: "User",
    description: "description",
    date: "date+time"
  }
];

export default class ReportPage extends React.Component {
  render() {
    return (
      <div className="report-page">
        <div className="report-page-title"> History </div>
        <div className="report-page-content">
          <Segment className="report-page-content">
            <Table celled striped>
              <Table.Body>
                {news.map((event, id) =>
                  <Table.Row key={id}>
                    <Table.Cell collapsing>
                      <Icon name="user outline" /> {event.user}
                    </Table.Cell>
                    <Table.Cell>
                      {event.description}
                    </Table.Cell>
                    <Table.Cell collapsing textAlign="right">
                      <Icon name="hourglass zero" /> {event.date}
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </Segment>
          <ReportFilter />
        </div>
      </div>
    );
  }
}
