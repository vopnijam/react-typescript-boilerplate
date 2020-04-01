import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import {
  authDeleteSuccessAction,
  authGetFailureAction,
  authGetSuccessAction,
  authPostFailureAction,
  authPostSuccessAction,
} from './actions';

import { stopWebSocket } from 'store/containers/app/actions';

import authApi from 'api/auth';

function* get() {
  try {
    // tslint:disable-next-line no-unbound-method no-unsafe-any
    const auth: IAuth = yield call(authApi.get);
    yield put(authGetSuccessAction(auth));
  } catch (err) {
    yield put(authGetFailureAction()); // tslint:disable-line no-unsafe-any
  }
}

function* post(action: IAuthPostRequestAction) {
  try {
    const { historyPush, ...data } = action.payload;
    // tslint:disable-next-line no-unbound-method no-unsafe-any
    const auth: IAuth = yield call(authApi.post, data);
    yield put(authPostSuccessAction(auth));
    yield call(historyPush, '/dashboard');
  } catch (err) {
    yield put(authPostFailureAction()); // tslint:disable-line no-unsafe-any
  }
}

function* del(action: IAuthDeleteRequestAction) {
  try {
    yield call(authApi.delete); // tslint:disable-line no-unbound-method

  // When someone clicks logout, we want to delete their credentials regardless
  // if they were logged out or not.
  } finally {
    yield put(authDeleteSuccessAction());
    yield put(stopWebSocket());
    if (action.payload) {
      // tslint:disable-next-line no-unbound-method
      yield call(action.payload.historyPush, '/login');
    } else {
      window.location.replace('/login');
    }
  }
}

export const rootSaga = [
  function* watchAuthGetRequest() {
    yield takeLatest('AUTH_GET_REQUEST', get);
  }(),
  function* watchAuthPostRequest() {
    yield takeLatest('AUTH_POST_REQUEST', post);
  }(),
  function* watchAuthDeleteRequest() {
    yield takeLatest('AUTH_DELETE_REQUEST', del);
  }(),
];
