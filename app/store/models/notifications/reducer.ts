const initialState: INotificationsModelState = {
  isDeleteLoading: false,
  isGetsLoading: false,
  isPatchLoading: false,
  list: [],
  toastedNotificationsIds: [],
};

export const notificationsModelReducer = (
  state = initialState,
  action: NotificationsActionTypes,
) => {
  switch (action.type) {
    case 'NOTIFICATIONS_DELETE_REQUEST': {
      return {
        ...state,
        isDeleteLoading: true,
      };
    }

    case 'NOTIFICATIONS_DELETE_SUCCESS': {
      return {
        ...state,
        isDeleteLoading: false,
        list: state.list.filter((notification: INotification) =>
          notification.id !== action.payload.id,
        ),
      };
    }

    case 'NOTIFICATIONS_DELETE_FAILURE': {
      return {
        ...state,
        isDeleteLoading: false,
      };
    }

    case 'NOTIFICATIONS_GETS_REQUEST': {
      return {
        ...state,
        isGetsLoading: true,
      };
    }

    case 'NOTIFICATIONS_GETS_SUCCESS': {
      return {
        ...state,
        isGetsLoading: false,
        list: action.payload.notifications,
      };
    }

    case 'NOTIFICATIONS_GETS_FAILURE': {
      return {
        ...state,
        isGetsLoading: false,
      };
    }

    case 'NOTIFICATIONS_PATCH_REQUEST': {
      return {
        ...state,
        isPatchLoading: true,
      };
    }

    case 'NOTIFICATIONS_PATCH_SUCCESS': {
      return {
        ...state,
        isPatchLoading: false,
        list: state.list.map((notification) => (
          notification.id !== action.payload.id ? notification : action.payload
        )),
      };
    }

    case 'NOTIFICATIONS_PATCH_FAILURE': {
      return {
        ...state,
        isPatchLoading: false,
      };
    }

    case 'ADD_NOTIFICATION_TO_TOASTED_LIST': {
      return {
        ...state,
        toastedNotificationsIds: state.toastedNotificationsIds.concat(action.payload),
      };
    }

    default: {
      return state;
    }
  }
};
