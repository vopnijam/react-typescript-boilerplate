export const notificationsGetsRequestAction = (
  payload?: INotificationsGetsRequestPayload,
): INotificationsGetsRequestAction => ({
  payload,
  type: 'NOTIFICATIONS_GETS_REQUEST',
});

export const notificationsGetsSuccessAction = (
  payload: INotificationsGetsSuccessPayload,
): INotificationsGetsSuccessAction => ({
  payload,
  type: 'NOTIFICATIONS_GETS_SUCCESS',
});

export const notificationsGetsFailureAction = (): INotificationsGetsFailureAction => ({
  type: 'NOTIFICATIONS_GETS_FAILURE',
});

export const notificationsPatchRequestAction = (
payload: INotification,
): INotificationsPatchRequestAction => ({
  payload,
  type: 'NOTIFICATIONS_PATCH_REQUEST',
});

export const notificationsPatchSuccessAction = (
  payload: INotification,
): INotificationsPatchSuccessAction => ({
  payload,
  type: 'NOTIFICATIONS_PATCH_SUCCESS',
});

export const notificationsPatchFailureAction = (): INotificationsPatchFailureAction => ({
  type: 'NOTIFICATIONS_PATCH_FAILURE',
});

export const notificationsDeleteRequestAction = (
  payload: INotification,
): INotificationsDeleteRequestAction => ({
  payload,
  type: 'NOTIFICATIONS_DELETE_REQUEST',
});

export const notificationsDeleteSuccessAction = (
  payload: INotification,
): INotificationsDeleteSuccessAction => ({
  payload,
  type: 'NOTIFICATIONS_DELETE_SUCCESS',
});

export const notificationsDeleteFailureAction = (): INotificationsDeleteFailureAction => ({
  type: 'NOTIFICATIONS_DELETE_FAILURE',
});

export const addNotificationToToastedListAction = (
  payload: number,
): IAddNotificationToToastedListAction => ({
  payload,
  type: 'ADD_NOTIFICATION_TO_TOASTED_LIST',
});
