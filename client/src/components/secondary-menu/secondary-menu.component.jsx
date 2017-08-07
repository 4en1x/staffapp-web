import React from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import { addFilter } from '../../main/interview/interview-actions';
import './secondary-menu.css';

class SecondaryMenuComponent extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const Items = this.props.items.map(item => ({
      key: item,
      name: item
    }));

    return (
      <Menu
        secondary
        vertical
        className="custom"
        onItemClick={this.props.onItemClick}
        items={Items}
        defaultActiveIndex={0}
      />
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    addFilter: filter => {
      dispatch(addFilter(filter));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SecondaryMenuComponent
);
