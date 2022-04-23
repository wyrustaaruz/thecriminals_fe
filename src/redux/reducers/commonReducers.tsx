const initialState = {
  loading: false,
};

const commonReducers = (state = initialState, action: any) => {
  switch (action.type) {
    case "LOADING_TRUE":
      return {
        ...state,
        loading: true,
      };
    case "LOADING_FALSE":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default commonReducers;
