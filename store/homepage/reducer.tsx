export default (state: any, action: any) => {
  switch (action.type) {
    case "GET_HEADER_REQUEST":
      return {
        ...state,
        drinks: {
          ...state.drinks,
          loading: true,
        },
      };
    case "GET_HEADER_REQUEST_SUCCESS":
      return {
        ...state,
        drinks: {
          ...state.drinks,
          loading: false,
          data: action.data.drinks,
        },
      };
    default:
      return state;
  }
};
