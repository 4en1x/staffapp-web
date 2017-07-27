const authReducer = (
  state = { name: '', role: '', isAuthError: true },
  action
) => {
  switch (action.type) {
    case 'ADD_USER':
      return Object.assign({}, state, action.user, { isAuthError: false });

    case 'ADD_USER_ERROR':
      return { ...state, isAuthError: true };

    default:
      return state;
  }
};

export default authReducer;
