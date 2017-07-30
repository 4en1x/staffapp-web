import React from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import { addFilter } from '../../main/interview/interview-actions';
import './secondary-menu.css';

const ItemsList = ['my', 'assigned', 'all'].map(item => ({
  key: item,
  name: item,
}));

class SecondaryMenuComponent extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handleItemClick = (e, { name }) => {
    this.props.addFilter({ type: name });
    this.setState({ activeItem: name });
  };

  render() {
    // const ItemsList = this.props.itemsList.map(item => {
    //   return { key: item, name: item };
    // });

    return (
      <Menu
        secondary
        vertical
        className="custom"
        onItemClick={this.handleItemClick}
        items={ItemsList}
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
