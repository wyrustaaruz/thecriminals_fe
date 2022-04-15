import { call, put, takeEvery } from "redux-saga/effects";
import { getHeaderFunction } from "../../service";
import { getHeaderRequestSuccess } from "./action";
function* fetchData() {
  try {
    const data = yield call(getHeaderFunction);
    yield put(getHeaderRequestSuccess(data));
  } catch (err) {
    console.log("err", err);
  }
}
export default function* headerSaga() {
  yield takeEvery("GET_HEADER_REQUEST", fetchData);
}
