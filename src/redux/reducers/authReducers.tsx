const initialState = {
  authToken: null,
};

const authReducers = (state = initialState, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        authToken: action.payload,
      };
    case "REGISTER":
      return {
        ...state,
      };
    case "FORGET_PASSWORD":
      return {
        ...state,
      };
    case "LOGOUT":
      return {
        authToken: null,
      };
    default:
      return state;
  }
};

export default authReducers;
