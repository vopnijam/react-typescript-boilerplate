export const incrementLoading = (): IIncrementLoadingAction => ({
  type: 'INCREMENT_LOADING',
});

export const decrementLoading = (): IDecrementLoadingAction => ({
  type: 'DECREMENT_LOADING',
});

export const notify = (payload: INotify): INotifyAction => ({
  payload,
  type: 'NOTIFY',
});

export const destroyNotify = (payload: INotify): IDestroyNotifyAction => ({
  payload,
  type: 'DESTROY_NOTIFY',
});

export const cancelNotify = (payload: INotify): ICancelNotifyAction => ({
  payload,
  type: 'CANCEL_NOTIFY',
});

export const infoBanner = (payload: IInfoBanner): IInfoBannerAction => ({
  payload,
  type: 'INFO_BANNER',
});

export const cancelInfoBanner = (): ICancelInfoBannerAction => ({
  type: 'CANCEL_INFO_BANNER',
});

export const initializeWebSocket = (webSocketType: WebSocketType): IInitializeWebSocketAction => ({
  payload: webSocketType,
  type: 'INITIALIZE_WEB_SOCKET',
});

export const stopWebSocket = (): IStopWebSocketAction => ({
  type: 'STOP_WEB_SOCKET',
});

export const webSocketFailed = (webSocketType: WebSocketType): IWebSocketFailedAction => ({
  payload: webSocketType,
  type: 'WEB_SOCKET_FAILED',
});
