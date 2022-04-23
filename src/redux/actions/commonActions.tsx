const LoadingTrue = () => {
  return async (dispatch: any) => {
    dispatch({
      type: "LOADING_TRUE",
    });
  };
};
const LoadingFalse = () => {
  return async (dispatch: any) => {
    dispatch({
      type: "LOADING_FALSE",
    });
  };
};

const commonActions = {
  LoadingTrue,
  LoadingFalse,
};

export default commonActions;
