export const getHeaderRequest = () => ({
  type: "GET_HEADER_REQUEST",
});
export const getHeaderRequestSuccess = (data: Object) => ({
  type: "GET_HEADER_REQUEST_SUCCESS",
  data,
});
