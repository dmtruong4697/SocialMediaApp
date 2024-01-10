import { all } from "redux-saga/effects";
import authSaga from "./auth.saga";
import coinSaga from "./coin.saga";

function* rootSaga() {
  yield all([authSaga(), coinSaga()]);
}

export default rootSaga;
