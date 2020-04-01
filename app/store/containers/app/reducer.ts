// tslint:disable cyclomatic-complexity

const initialState: IAppContainerState = {
  activeAuth: undefined,
  activeNotifications: [],
  infoBanner: {
    isOpen: false,
    message: '',
    type: 'Success',
  },
  maintenance: false,
  numLoading: 0,
  toasts: [],
};

export const appReducer = (
  state = initialState,
  action: AppActionTypes,
) => {
  switch (action.type) {
    case 'AUTH_UPDATE': {
      return {
        ...state,
        activeAuth: {
          ...action.payload,
          isAuth: !!action.payload.id,
        },
      };
    }

    case 'AUTH_GET_SUCCESS': {
      return {
        ...state,
        activeAuth: {
          ...action.payload,
          isAuth: true,
        },
      };
    }

    case 'AUTH_GET_FAILURE': {
      return {
        ...state,
        activeAuth: initialState.activeAuth,
      };
    }

    case 'AUTH_POST_SUCCESS': {
      return {
        ...state,
        activeAuth: {
          ...action.payload,
          isAuth: true,
        },
      };
    }

    case 'AUTH_POST_FAILURE': {
      return {
        ...state,
        activeAuth: initialState.activeAuth,
      };
    }

    case 'AUTH_DELETE_SUCCESS': {
      return {
        ...state,
        activeAuth: initialState.activeAuth,
      };
    }

    case 'DECREMENT_LOADING': {
      return {
        ...state,
        numLoading: state.numLoading -= 1,
      };
    }

    case 'INCREMENT_LOADING': {
      return {
        ...state,
        numLoading: state.numLoading += 1,
      };
    }

    case 'NOTIFY': {
      return {
        ...state,
        toasts: state.toasts.concat(action.payload),
      };
    }

    case 'DESTROY_NOTIFY': {
      return {
        ...state,
        toasts: state.toasts.filter((toast) =>
          toast.id !== action.payload.id,
        ),
      };
    }

    case 'CANCEL_NOTIFY': {
      return {
        ...state,
        toasts: state.toasts.map((toast) =>
          toast.id === action.payload.id ? {
            ...toast,
            isOpen: false,
          } : toast,
        ),
      };
    }

    case 'INFO_BANNER': {
      return {
        ...state,
        infoBanner: action.payload,
      };
    }

    case 'CANCEL_INFO_BANNER': {
      return {
        ...state,
        infoBanner: {
          ...state.infoBanner,
          isOpen: false,
        },
      };
    }

    case 'NOTIFICATIONS_DELETE_SUCCESS': {
      return {
        ...state,
        activeNotifications: state.activeNotifications.filter((notification: INotification) =>
          notification.id !== action.payload.id,
        ),
      };
    }

    case 'NOTIFICATIONS_GETS_SUCCESS': {
      return {
        ...state,
        activeNotifications: action.payload.notifications,
      };
    }

    case 'NOTIFICATIONS_PATCH_SUCCESS': {
      return {
        ...state,
        activeNotifications: state.activeNotifications.map((notification) => (
          notification.id !== action.payload.id ? notification : action.payload
        )),
      };
    }

    default: {
      return state;
    }
  }
};
