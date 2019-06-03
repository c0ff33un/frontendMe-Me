function sessions(state = {}, action) {
  switch (action.type) {
    case "SET_SESSION_USER":
      return {
        ...state,
        ...action
      };

    default:
      return state;
  }
}

export default sessions;
