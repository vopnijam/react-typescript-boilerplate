import { eventChannel, EventChannel } from 'redux-saga';
import {
  call,
  put,
  select,
  take,
  takeLatest,
} from 'redux-saga/effects';

import { sleep } from 'utils/sleep';

import { webSocketFailed } from 'store/containers/app/actions';

import { AppState } from 'store';
import { notificationsGetsRequestAction } from 'store/models/notifications/actions';

let mySocket: WebSocket | undefined;

const createWebSocketConnection = async (): Promise<WebSocket> => (
  new Promise<WebSocket>((resolve, reject) => {
    const socket: WebSocket = new WebSocket(`${process.env.WEBSOCKET_ENDPOINT}/webSocket`);

    socket.onopen = () => {
      resolve(socket);
    };

    socket.onerror = () => {
      reject();
    };

    socket.onclose = () => {
      reject();
    };
  })
);

const createEventChannel = async (socket: WebSocket) => (
  eventChannel((emit) => {
    socket.onmessage = (event: MessageEvent) => {
      emit(event);
    };

    socket.onerror = (event: Event) => {
      emit(event);
    };

    socket.onclose = (event: CloseEvent) => {
      emit(event);
    };

    return () => {
      socket.close();
    };
  })
);

function* publishActionFromWebSocket(action: WebSocketAllowedRequestActionTypes) {
  switch (action.type) {
    case 'NOTIFICATIONS_GETS_REQUEST': {
      yield put(notificationsGetsRequestAction());
      break;
    }

    default: {
      // tslint:disable-next-line no-console
      console.error(`Invalid WebSocketAllowedRequestActionType: ${action}`);
    }
  }
}

function* initializeWebSocket(action: IInitializeWebSocketAction) {
  try {
    // tslint:disable-next-line no-unsafe-any
    const appState: IAppContainerState = yield select((state: AppState) => state.containers.app);

    const webSocketType = action.payload;

    if (!appState?.activeAuth?.isAuth) {
      throw new Error('');
    }

    // tslint:disable-next-line no-unsafe-any
    mySocket = yield call(createWebSocketConnection);

    // tslint:disable-next-line no-unsafe-any
    const channel: EventChannel<unknown> = yield call(createEventChannel, mySocket as WebSocket);

    while (true) {
      // tslint:disable-next-line no-unsafe-any
      const event: MessageEvent | CloseEvent | Event = yield take(channel);

      if (event.type !== 'message') {
        yield put(webSocketFailed(webSocketType));
      } else {
        const data = (event as MessageEvent).data as string;

        const webSocketAction = JSON.parse(data) as WebSocketAllowedRequestActionTypes;

        yield publishActionFromWebSocket(webSocketAction);
      }
    }
  } catch (err) {
    yield put(webSocketFailed(action.payload));
  }
}

function* stopWebSocket() {
  mySocket?.close();
  mySocket = undefined;
}

function* reinitializeWebSocket(action: IWebSocketFailedAction) {
  yield call(sleep, 1000);

  yield call(
    initializeWebSocket,
    {
      payload: action.payload,
      type: 'INITIALIZE_WEB_SOCKET',
    },
  );
}

export const rootSaga = [
  function* watchInitializeWebSockets() {
    yield takeLatest('INITIALIZE_WEB_SOCKET', initializeWebSocket);
  }(),

  function* watchStopWebSockets() {
    yield takeLatest('STOP_WEB_SOCKET', stopWebSocket);
  }(),

  function* watchWebSocketFailed() {
    yield takeLatest('WEB_SOCKET_FAILED', reinitializeWebSocket);
  }(),
];
