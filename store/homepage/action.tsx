export const getHeaderRequest = () => ({
  type: "GET_HEADER_REQUEST",
});
export const getHeaderRequestSuccess = (data: any) => ({
  type: "GET_HEADER_REQUEST_SUCCESS",
  data,
});
export const getSubHeaderRequest = () => ({
  type: "GET_SUB_HEADER_REQUEST",
});
export const getSubHeaderRequestSuccess = (data: any) => ({
  type: "GET_SUB_HEADER_REQUEST_SUCCESS",
  data,
});
