type NOTIFICATIONS_GETS_REQUEST = 'NOTIFICATIONS_GETS_REQUEST';
type NOTIFICATIONS_GETS_SUCCESS = 'NOTIFICATIONS_GETS_SUCCESS';
type NOTIFICATIONS_GETS_FAILURE = 'NOTIFICATIONS_GETS_FAILURE';

type NOTIFICATIONS_PATCH_REQUEST = 'NOTIFICATIONS_PATCH_REQUEST';
type NOTIFICATIONS_PATCH_SUCCESS = 'NOTIFICATIONS_PATCH_SUCCESS';
type NOTIFICATIONS_PATCH_FAILURE = 'NOTIFICATIONS_PATCH_FAILURE';

type NOTIFICATIONS_DELETE_REQUEST = 'NOTIFICATIONS_DELETE_REQUEST';
type NOTIFICATIONS_DELETE_SUCCESS = 'NOTIFICATIONS_DELETE_SUCCESS';
type NOTIFICATIONS_DELETE_FAILURE = 'NOTIFICATIONS_DELETE_FAILURE';

type ADD_NOTIFICATION_TO_TOASTED_LIST = 'ADD_NOTIFICATION_TO_TOASTED_LIST';

type NotificationStatus = 'unread' | 'read';

interface INotificationsModelState {
  isDeleteLoading: boolean;
  isGetsLoading: boolean;
  isPatchLoading: boolean;
  list: INotification[];
  toastedNotificationsIds: number[];
}

interface INotification {
  id: number;
  createdAt: string;
  message: string;
  status: NotificationStatus;
  title: string;
  url?: string;
}

interface INotificationsGetsRequestPayload {
  showToasts: boolean;
}

interface INotificationsGetsSuccessPayload {
  notifications: INotification[];
  showToasts: boolean;
}

interface INotificationPatch {
  status: NotificationStatus;
}

interface INotificationsGetsRequestAction {
  payload?: INotificationsGetsRequestPayload;
  type: NOTIFICATIONS_GETS_REQUEST;
}

interface INotificationsGetsSuccessAction {
  payload: INotificationsGetsSuccessPayload;
  type: NOTIFICATIONS_GETS_SUCCESS;
}

interface INotificationsGetsFailureAction {
  type: NOTIFICATIONS_GETS_FAILURE;
}

interface INotificationsPatchRequestAction {
  payload: INotification;
  type: NOTIFICATIONS_PATCH_REQUEST;
}

interface INotificationsPatchSuccessAction {
  payload: INotification;
  type: NOTIFICATIONS_PATCH_SUCCESS;
}

interface INotificationsPatchFailureAction {
  type: NOTIFICATIONS_PATCH_FAILURE;
}

interface INotificationsDeleteRequestAction {
  payload: INotification;
  type: NOTIFICATIONS_DELETE_REQUEST;
}

interface INotificationsDeleteSuccessAction {
  payload: INotification;
  type: NOTIFICATIONS_DELETE_SUCCESS;
}

interface INotificationsDeleteFailureAction {
  type: NOTIFICATIONS_DELETE_FAILURE;
}

interface IAddNotificationToToastedListAction {
  payload: number;
  type: ADD_NOTIFICATION_TO_TOASTED_LIST;
}

type NotificationsActionTypes = (
  IAddNotificationToToastedListAction |
  INotificationsDeleteFailureAction |
  INotificationsDeleteRequestAction |
  INotificationsDeleteSuccessAction |
  INotificationsGetsFailureAction |
  INotificationsGetsRequestAction |
  INotificationsGetsSuccessAction |
  INotificationsPatchFailureAction |
  INotificationsPatchRequestAction |
  INotificationsPatchSuccessAction
);
