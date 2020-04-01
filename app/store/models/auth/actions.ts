export const authUpdateAction = (payload: IAuth): IAuthUpdateAction => ({
  payload,
  type: 'AUTH_UPDATE',
});

export const authGetRequestAction = (): IAuthGetRequestAction => ({
  type: 'AUTH_GET_REQUEST',
});

export const authGetSuccessAction = (payload: IAuth): IAuthGetSuccessAction => ({
  payload,
  type: 'AUTH_GET_SUCCESS',
});

export const authGetFailureAction = (): IAuthGetFailureAction => ({
  type: 'AUTH_GET_FAILURE',
});

export const authPostRequestAction = (payload: IAuthForm & IHistory): IAuthPostRequestAction => ({
  payload,
  type: 'AUTH_POST_REQUEST',
});

export const authPostSuccessAction = (payload: IAuth): IAuthPostSuccessAction => ({
  payload,
  type: 'AUTH_POST_SUCCESS',
});

export const authPostFailureAction = (): IAuthPostFailureAction => ({
  type: 'AUTH_POST_FAILURE',
});

export const authDeleteRequestAction = (payload?: IHistory): IAuthDeleteRequestAction => ({
  payload,
  type: 'AUTH_DELETE_REQUEST',
});

export const authDeleteSuccessAction = (): IAuthDeleteSuccessAction => ({
  type: 'AUTH_DELETE_SUCCESS',
});

export const authDeleteFailureAction = (): IAuthDeleteFailureAction => ({
  type: 'AUTH_DELETE_FAILURE',
});
