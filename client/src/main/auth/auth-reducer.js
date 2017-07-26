const authReducer = (
  state = { name: "", role: "", isAuthError: true },
  action
) => {
  switch (action.type) {
    case "ADD_USER":
      return action.user;

    case "ADD_USER_ERROR":
      return { ...state, isAuthError: false };

    default:
      return state;
  }
};

export default authReducer;
