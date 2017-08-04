import React from 'react';
import { connect } from 'react-redux';
import SecondaryMenuComponent from '../../../../components/secondary-menu/secondary-menu.component';
import { addFilter } from '../../../interview/interview-actions';

class SecondaryMenu extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handleItemClick = (e, { name }) => {
    this.props.addFilter({ type: name });
    this.setState({ activeItem: name });
  };

  render() {
    return (
      <SecondaryMenuComponent
        onItemClick={this.handleItemClick}
        items={['my', 'assigned', 'all']}
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

export default connect(mapStateToProps, mapDispatchToProps)(SecondaryMenu);
