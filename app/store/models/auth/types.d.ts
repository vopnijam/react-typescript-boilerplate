type AUTH_UPDATE = 'AUTH_UPDATE';

type AUTH_GET_REQUEST = 'AUTH_GET_REQUEST';
type AUTH_GET_SUCCESS = 'AUTH_GET_SUCCESS';
type AUTH_GET_FAILURE = 'AUTH_GET_FAILURE';

type AUTH_POST_REQUEST = 'AUTH_POST_REQUEST';
type AUTH_POST_SUCCESS = 'AUTH_POST_SUCCESS';
type AUTH_POST_FAILURE = 'AUTH_POST_FAILURE';

type AUTH_DELETE_REQUEST = 'AUTH_DELETE_REQUEST';
type AUTH_DELETE_SUCCESS = 'AUTH_DELETE_SUCCESS';
type AUTH_DELETE_FAILURE = 'AUTH_DELETE_FAILURE';

interface IAuthModelState {
  isDeleteLoading: boolean;
  isGetLoading: boolean;
  isPostLoading: boolean;
}

interface IAuth {
  email: string;
  firstName: string;
  id: number;
  isAuth: boolean;
  lastName: string;
}

interface IAuthPost {
  email: string;
  password: string;
}

interface IAuthForm {
  email?: string;
  password?: string;
}

interface IAuthFormError {
  email?: string;
  password?: string;
}

interface IAuthFormTouched {
  email?: boolean;
  password?: boolean;
}

interface IAuthUpdateAction {
  payload: IAuth;
  type: AUTH_UPDATE;
}

interface IAuthGetRequestAction {
  type: AUTH_GET_REQUEST;
}

interface IAuthGetSuccessAction {
  payload: IAuth;
  type: AUTH_GET_SUCCESS;
}

interface IAuthGetFailureAction {
  type: AUTH_GET_FAILURE;
}

interface IAuthPostRequestAction {
  payload: IAuthForm & IHistory;
  type: AUTH_POST_REQUEST;
}

interface IAuthPostSuccessAction {
  payload: IAuth;
  type: AUTH_POST_SUCCESS;
}

interface IAuthPostFailureAction {
  type: AUTH_POST_FAILURE;
}

interface IAuthDeleteRequestAction {
  payload?: IHistory;
  type: AUTH_DELETE_REQUEST;
}

interface IAuthDeleteSuccessAction {
  type: AUTH_DELETE_SUCCESS;
}

interface IAuthDeleteFailureAction {
  type: AUTH_DELETE_FAILURE;
}

type AuthActionTypes = (
  IAuthDeleteFailureAction |
  IAuthDeleteRequestAction |
  IAuthDeleteSuccessAction |
  IAuthGetFailureAction |
  IAuthGetRequestAction |
  IAuthGetSuccessAction |
  IAuthPostFailureAction |
  IAuthPostRequestAction |
  IAuthPostSuccessAction
);
