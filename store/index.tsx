import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import reducer from "./homepage/reducer";
import saga from "./homepage/saga";
const INITIAL_STATE = {
  drinks: {},
};
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  INITIAL_STATE,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(saga);
export default store;
