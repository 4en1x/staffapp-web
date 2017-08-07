import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';

let data = [];

export default class SearchExampleStandard extends Component {
  componentWillMount() {
    this.resetComponent();
  }
  serverSearch = value => [
    {
      name: 'Nick',
      role: 'HRM',
      email: 'nzHRM@gmail.com',
      id: '1'
    },
    {
      name: 'James',
      role: 'Worker',
      email: 'nzWorker@gmail.com',
      id: '2'
    },
    {
      name: 'Jastin',
      role: 'Admin',
      email: 'nzWorker@gmail.com',
      id: '3'
    },
    {
      name: 'Jacobs',
      role: 'Worker',
      email: 'nzWorker@gmail.com',
      id: '4'
    },
    {
      name: 'Tomas',
      role: 'Admin',
      email: 'nzAdmin@gmail.com',
      id: '5'
    }
  ];
  resetComponent() {
    this.setState({ isLoading: false, results: [], value: '' });
  }
  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });
    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();
      this.setState({
        isLoading: false,
        results: this.buildList(this.serverSearch(value))
      });
    }, 500);
  };
  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title });
    data.push(result.id);
    this.props.tempData.push(result.title);
    this.props.onDataChange(e, data);
  };
  buildList = array => {
    let data = [];
    array.map(step => {
      const temp = {
        price: step.role,
        title: step.name,
        description: step.email,
        id: step.id
      };
      data.push(temp);
    });
    return data;
  };
  render() {
    const { isLoading, value, results } = this.state;
    return (
      <Search
        oading={isLoading}
        placeholder="name"
        onResultSelect={(event, data) => {
          this.handleResultSelect(event, data);
        }}
        onSearchChange={(event, data) => {
          this.handleSearchChange(event, data);
        }}
        results={results}
        value={value}
      />
    );
  }
}
