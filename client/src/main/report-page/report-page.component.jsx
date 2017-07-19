import React from "react";
import { Segment } from "semantic-ui-react";
import ReportFilter from "../../components/report-filter/report-filter.component";
import VacancyList from "./components/vacancy-list.component";
import CandidateList from "./components/candidate-list.component";
import "./report-page.css";

const vacancies = [
  {
    id: "1",
    name: "Project",
    dateStart: "09.90.2017",
    primarySkill: "primarySkill",
    status: "status",
    location: "location"
  },
  {
    id: "2",
    name: "Project",
    dateStart: "09.90.2017",
    primarySkill: "primarySkill",
    status: "status",
    location: "location"
  },
  {
    id: "3",
    name: "Project",
    dateStart: "09.90.2017",
    primarySkill: "primarySkill",
    status: "status",
    location: "location"
  }
];
const candidates = [
  {
    id: "1",
    name: "Man",
    time: "09.90.2017",
    technology: "primarySkill",
    status: "status",
    city: "location"
  },
  {
    id: "2",
    name: "Man",
    time: "09.90.2017",
    technology: "primarySkill",
    status: "status",
    city: "location"
  },
  {
    id: "3",
    name: "Man",
    time: "09.90.2017",
    technology: "primarySkill",
    status: "status",
    city: "location"
  }
];
export default class ReportPage extends React.Component {
  render() {
    return (
      <div className="report-page">
        <div className="report-page-title"> Reports </div>
        <div className="report-page-content">
          <Segment className="report-page-workplace">
            <VacancyList vacancies={vacancies} />
            <CandidateList candidates={candidates} />
          </Segment>
          <ReportFilter />
        </div>
      </div>
    );
  }
}
