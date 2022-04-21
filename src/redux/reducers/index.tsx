import { combineReducers } from "redux";
import authReducers from "./authReducers";
import homepageReducers from "./homepageReducers";

const reducers = combineReducers({
  authReducers,
  homepageReducers,
});

export default reducers;
