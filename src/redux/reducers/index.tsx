import authReducers from "./authReducers";
import { combineReducers } from "redux";

const reducers = combineReducers({
  authReducers,
});

export default reducers;
