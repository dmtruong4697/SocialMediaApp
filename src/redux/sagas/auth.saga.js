import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { loginFailure, loginSuccess, loginRequest } from '../actions/auth.action';
import AsyncStorage from 'react-native';

function* login(action) {
  try {
    const BACKEND_URL = 'https://it4788.catan.io.vn'
    const { email, password, uuid } = action.payload;
    const response = yield call(axios.post, `${BACKEND_URL}/login`, {
      email,
      password,
      uuid,
    });

    if (response.status === 200) {
      const currentUser = {
        token: response.data.data.token,
        id: response.data.data.id,
        userName: response.data.data.username,
        avatar: response.data.data.avatar,
        coins: response.data.data.coins,
      };

      //yield call(AsyncStorage.setItem, 'token', currentUser.token);
      console.log('response:', response.data);

      yield put(loginSuccess(currentUser));
      console.log(currentUser);
    } else {
      console.log('not code 200')
    }
  } catch (error) {
    console.error('Error during login:', error.response.data.message);
    //console.log(action.payload);
    yield put(loginFailure(error.response?.data?.message || 'An error occurred'));
  }
}

function* authSaga() {
  yield takeLatest('LOGIN_REQUEST', login);
}

export default authSaga;
