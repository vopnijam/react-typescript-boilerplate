type CANCEL_INFO_BANNER = 'CANCEL_INFO_BANNER';
type CANCEL_NOTIFY = 'CANCEL_NOTIFY';
type DECREMENT_LOADING = 'DECREMENT_LOADING';
type DESTROY_NOTIFY = 'DESTROY_NOTIFY';
type INCREMENT_LOADING = 'INCREMENT_LOADING';
type INFO_BANNER = 'INFO_BANNER';
type INITIALIZE_WEB_SOCKET = 'INITIALIZE_WEB_SOCKET';
type NOTIFY = 'NOTIFY';
type STOP_WEB_SOCKET = 'STOP_WEB_SOCKET';
type WEB_SOCKET_FAILED = 'WEB_SOCKET_FAILED';

interface IAppContainerState {
  activeAuth?: IAuth;
  activeNotifications: INotification[];
  infoBanner: IInfoBanner;
  maintenance: boolean;
  toasts: INotify[];
  numLoading: number;
}

type WebSocketType = 'main';

type NotifyType = 'Success' | 'Warning' | 'Error' | 'Neutral';

interface INotify {
  id: string;
  isOpen: boolean;
  message: string;
  type: NotifyType;
}

type InfoBannerType = NotifyType;

interface IInfoBanner {
  isOpen: boolean;
  message: string;
  time?: number;
  type: InfoBannerType;
}

interface IIncrementLoadingAction {
  type: INCREMENT_LOADING;
}

interface IDecrementLoadingAction {
  type: DECREMENT_LOADING;
}

interface INotifyAction {
  type: NOTIFY;
  payload: INotify;
}

interface IDestroyNotifyAction {
  type: DESTROY_NOTIFY;
  payload: INotify;
}

interface ICancelNotifyAction {
  type: CANCEL_NOTIFY;
  payload: INotify;
}

interface IInfoBannerAction {
  type: INFO_BANNER;
  payload: IInfoBanner;
}

interface ICancelInfoBannerAction {
  type: CANCEL_INFO_BANNER;
}

interface IInitializeWebSocketAction {
  payload: WebSocketType;
  type: INITIALIZE_WEB_SOCKET;
}

interface IStopWebSocketAction {
  type: STOP_WEB_SOCKET;
}

interface IWebSocketFailedAction {
  payload: WebSocketType;
  type: WEB_SOCKET_FAILED;
}

type AppActionTypes = (
  IAuthDeleteSuccessAction |
  IAuthGetFailureAction |
  IAuthGetSuccessAction |
  IAuthPostFailureAction |
  IAuthPostSuccessAction |
  IAuthUpdateAction |
  ICancelInfoBannerAction |
  ICancelNotifyAction |
  IDecrementLoadingAction |
  IDestroyNotifyAction |
  IIncrementLoadingAction |
  IInfoBannerAction |
  IInitializeWebSocketAction |
  INotificationsDeleteSuccessAction |
  INotificationsGetsSuccessAction |
  INotificationsPatchSuccessAction |
  INotifyAction |
  IStopWebSocketAction |
  IWebSocketFailedAction
);

type WebSocketAllowedRequestActionTypes = (
  INotificationsGetsRequestAction
);
