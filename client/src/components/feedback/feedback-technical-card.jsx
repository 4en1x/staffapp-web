import React from "react";
import { Select, TextArea } from "semantic-ui-react";
import "./feedback-technical-card.css";

const grades = [
  { key: "one", value: "one", text: "one" },
  { key: "two", value: "two", text: "two" },
  { key: "three", value: "three", text: "three" },
  { key: "four", value: "four", text: "four" },
  { key: "five", value: "five", text: "five" },
  { key: "six", value: "six", text: "six" },
  { key: "seven", value: "seven", text: "seven" },
  { key: "eight", value: "eight", text: "eight" },
  { key: "nine", value: "nine", text: "nine" },
  { key: "ten", value: "ten", text: "ten" }
];

const DEFAULT_SELECT_VALUE = 0;

export default class FeedbackTechnicalCard extends React.Component {
  componentDidMount() {
    const technology = this.props.data.technology;
    const input = this.input;
    this.props.inputHandle(
      {
        technology,
        input,
        select: DEFAULT_SELECT_VALUE
      },
      technology
    );
  }

  render() {
    const data = this.props.data;
    return (
      <div className="feedback-technical-card">
        <div className="content-top">
          <div className="technology-label">
            {data.technology}
          </div>
          <div>
            <Select
              onChange={(event, data) =>
                this.props.selectHandle(data.value, this.props.data.technology)}
              placeholder="grade"
              options={grades}
              className="select-grade"
            />
          </div>
        </div>
        <TextArea
          ref={element => (this.input = element)}
          placeholder="Add description"
          className="text-area"
        />
      </div>
    );
  }
}
