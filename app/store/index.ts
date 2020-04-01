import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import { logger } from 'middleware/logger';

// Containers
import { rootSaga as appSaga } from './containers/app/sagas';

import { appReducer } from './containers/app/reducer';
import { loginReducer } from './containers/login/reducer';

// Models
import { rootSaga as authSaga } from './models/auth/sagas';
import { rootSaga as notificationsSaga } from './models/notifications/sagas';

import { authModelReducer } from './models/auth/reducer';
import { notificationsModelReducer } from './models/notifications/reducer';

const rootReducer = combineReducers({
  containers: combineReducers({
    app: appReducer,
    login: loginReducer,
  }),

  models: combineReducers({
    auth: authModelReducer,
    notifications: notificationsModelReducer,
  }),
});

export type AppState = ReturnType<typeof rootReducer>;

const sagaMiddleware = createSagaMiddleware();

export default () => {
  let store;

  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging') {
    store = createStore(
      rootReducer,
      composeWithDevTools(applyMiddleware(
        logger,
        sagaMiddleware,
      )),
    );

  } else {
    store = createStore(
      rootReducer,
      composeWithDevTools(applyMiddleware(
        sagaMiddleware,
      )),
    );
  }

  function* rootSaga() {
    yield all([
      ...appSaga,
      ...authSaga,
      ...notificationsSaga,
    ]);
  }

  sagaMiddleware.run(rootSaga);

  return store;
};
