const authReducer = (
  state = { name: '', role: '', isAuthError: true, tryLoginWithCookies: true },
  action
) => {
  switch (action.type) {
    case 'ADD_USER':
      return Object.assign({}, state, action.user, { isAuthError: false, tryLoginWithCookies: false });

    case 'ADD_USER_ERROR':
      return Object.assign({}, state, {isAuthError: true, tryLoginWithCookies: false });

    case 'REMOVE_USER':
      return Object.assign({}, state, action.user, { isAuthError: true });

    case 'FAILED_LOGIN_WITH_COOKIES':
      return Object.assign({}, state, { tryLoginWithCookies: false });

    default:
      return state;
  }
};

export default authReducer;
