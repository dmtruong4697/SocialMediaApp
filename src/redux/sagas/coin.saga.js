import { takeLatest, call, put, select } from "redux-saga/effects";
import {
  buyCoinRequest,
  buyCoinSuccess,
  buyCoinFailure,
  updateCoinRequest,
  updateCoinFailure,
  updateCoinSuccess,
} from "../actions/coin.action";
import axios from "axios";
import { Axios } from "axios";
function* buyCoin(action) {
  try {
    const BACKEND_URL = "https://it4788.catan.io.vn";
    const currentUser = yield select((state) => state.auth.currentUser);
    // const res = yield call(
    //   axios.post,
    //   `${BACKEND_URL}/get_user_info`,
    //   { id: currentUser.id },
    //   { headers: { Authorization: `Bearer ${currentUser.token}` } }
    // );
    // if (res.status == 200) {
    //   const currentCoin = currentUser.coin;
    // }
    const res = yield call(
      axios.post,
      `${BACKEND_URL}/buy_coins`,
      { code: "string", coins: action.payload },
      { headers: { Authorization: `Bearer ${currentUser.token}` } }
    );
    if (res.status == 200) {
      console.log(res.data);
      yield put(buyCoinSuccess(res?.data?.data?.coins));
    } else {
      yield put(buyCoinFailure(res?.data?.message));
    }
  } catch (error) {
    yield put(
      buyCoinFailure(error.response?.data?.message || "An error occurred")
    );
  }
}
function* updateCoin(action) {
  try {
    const BACKEND_URL = "https://it4788.catan.io.vn";
    const currentUser = yield select((state) => state.auth.currentUser);
    const res = yield call(
      axios.post,
      `${BACKEND_URL}/get_user_info`,
      { user_id: currentUser.id },
      { headers: { Authorization: `Bearer ${currentUser.token}` } }
    );
    if (res.status == 201) {
      // console.log(res.data, "test");
      yield put(updateCoinSuccess(res?.data?.data?.coins));
    } else {
      // console.log(res, "test2");
      yield put(updateCoinFailure(res?.data?.message));
    }
  } catch (error) {
    console.log(error.response);
    yield put(
      updateCoinFailure(error.response?.data?.message || "An error occurred")
    );
  }
}
function* coinSaga() {
  yield takeLatest("BUY_COIN_REQUEST", buyCoin);
  yield takeLatest("UPDATE_COIN_REQUEST", updateCoin);
}
export default coinSaga;
