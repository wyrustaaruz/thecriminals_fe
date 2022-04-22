const initialState = {
  authToken: null,
  avatarList: [],
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
    case "CHARACTER_AVATARS":
      return {
        ...state,
        avatarList: action.payload,
      };
    default:
      return state;
  }
};

export default authReducers;
