const navigationBarReducer = (state = { activeTab: 'Interviews' }, action) => {
  switch (action.type) {
    case 'CHANGE_ACTIVE_TAB':
      return { ...state, activeTab: action.name };

    default:
      return state;
  }
};

export default navigationBarReducer;
