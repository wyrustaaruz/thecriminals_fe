import { combineReducers } from "redux";
import commonReducers from "./commonReducers";
import authReducers from "./authReducers";
import homepageReducers from "./homepageReducers";

const reducers = combineReducers({
  commonReducers,
  authReducers,
  homepageReducers,
});

export default reducers;
