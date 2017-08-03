import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addFilter, getFilterValues } from "../../../vacancy/vacancy-actions";
import HistoryFilterForm from "../../../../components/filter/filter-forms/history-filter-form";
import "./filter.css";

export default class FilterComponent extends React.Component {
  // componentDidMount() {
  //   this.props.getFilterValues();
  // }

  onSubmitClicked = filter => {
    console.log(filter);
    // this.props.addFilter(filter);
  };

  data = {
    statuses1: ["one", "two", "three"],
    statuses2: ["one", "two", "three"],
    statuses3: ["one", "two", "three"],
    statuses4: ["one", "two", "three"]
  };
  render(){
    return (
      <div className="filter-container">
        <HistoryFilterForm
          onSubmit={this.onSubmitClicked}
          data={this.data}
        />
      </div>
    );
  }
}

// FilterComponent.propTypes = {
//   form: PropTypes.func.isRequired
// };

//
// const mapStateToProps = state => {
//   return {
//     filterValues: state.history.filterValues || {}
//   };
// };
//
// export default connect(mapStateToProps, { addFilter, getFilterValues })(
//   FilterComponent
// );
