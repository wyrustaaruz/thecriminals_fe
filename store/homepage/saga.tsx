import { call, put, takeEvery } from "redux-saga/effects";
import { getHeaderFunction, getSubHeaderFunction } from "../../service";
import { getHeaderRequestSuccess, getSubHeaderRequestSuccess } from "./action";
function* fetchHeaderData(): Generator<any> {
  try {
    const data = yield call(getHeaderFunction);
    yield put(getHeaderRequestSuccess(data));
  } catch (err) {
    console.log("err", err);
  }
}
function* fetchSubHeaderData(): Generator<any> {
  try {
    const data = yield call(getSubHeaderFunction);
    yield put(getSubHeaderRequestSuccess(data));
  } catch (err) {
    console.log("err", err);
  }
}
export default function* headerSaga() {
  yield takeEvery("GET_HEADER_REQUEST", fetchHeaderData);
  yield takeEvery("GET_SUB_HEADER_REQUEST", fetchSubHeaderData);
}
