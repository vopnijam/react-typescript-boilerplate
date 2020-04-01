import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';

import {
  addNotificationToToastedListAction,
  notificationsDeleteFailureAction,
  notificationsDeleteSuccessAction,
  notificationsGetsFailureAction,
  notificationsGetsSuccessAction,
  notificationsPatchFailureAction,
  notificationsPatchSuccessAction,
} from './actions';

import { AppState } from 'store';

import notificationsApi from 'api/notifications';

import {
  generateToast,
} from 'utils/generate';

import {
  notify,
} from 'store/containers/app/actions';

function* gets(action: INotificationsGetsRequestAction) {
  try {
    // tslint:disable-next-line no-unbound-method no-unsafe-any
    const notifications: INotification[] = yield call(notificationsApi.gets);
    yield put(notificationsGetsSuccessAction({
      notifications,
      showToasts: action.payload?.showToasts ?? true,
    }));
  } catch (err) {
    yield put(notificationsGetsFailureAction()); // tslint:disable-line no-unsafe-any
  }
}

function* patch(action: INotificationsPatchRequestAction) {
  try {
    // tslint:disable-next-line no-unbound-method no-unsafe-any
    const notification: INotification = yield call(notificationsApi.patch, action.payload);
    yield put(notificationsPatchSuccessAction(notification));
  } catch (err) {
    yield put(notificationsPatchFailureAction()); // tslint:disable-line no-unsafe-any
  }
}

function* del(action: INotificationsDeleteRequestAction) {
  try {
    const notification = action.payload;
    yield call(notificationsApi.delete, notification); // tslint:disable-line no-unbound-method
    yield put(notificationsDeleteSuccessAction(notification));
  } catch (err) {
    yield put(notificationsDeleteFailureAction()); // tslint:disable-line no-unsafe-any
  }
}

function* getsSuccess(action: INotificationsGetsSuccessAction) {
  try {
    // tslint:disable-next-line no-unsafe-any
    const notificationsModelState: INotificationsModelState = yield select((state: AppState) => (
      state.models.notifications
    ));

    const toastedNotificationIds = notificationsModelState.toastedNotificationsIds;

    for (const notification of action.payload.notifications) {
      if (!toastedNotificationIds.includes(notification.id)) {
        if (action.payload.showToasts) {
          yield put(notify(generateToast(
            notification.message,
            'Neutral',
          )));
        }
        yield put(addNotificationToToastedListAction(notification.id));
      }
    }
  } catch (err) {
    yield put(notificationsGetsFailureAction()); // tslint:disable-line no-unsafe-any
  }
}

export const rootSaga = [
  function* watchNotificationsGetsRequest() {
    yield takeLatest('NOTIFICATIONS_GETS_REQUEST', gets);
  }(),
  function* watchNotificationsPatchRequest() {
    yield takeLatest('NOTIFICATIONS_PATCH_REQUEST', patch);
  }(),
  function* watchNotificationsDeleteRequest() {
    yield takeLatest('NOTIFICATIONS_DELETE_REQUEST', del);
  }(),
  function* watchNotificationsGetsSuccess() {
    yield takeLatest('NOTIFICATIONS_GETS_SUCCESS', getsSuccess);
  }(),
];
