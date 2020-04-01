const initialState: IAuthModelState = {
  isDeleteLoading: false,
  isGetLoading: false,
  isPostLoading: false,
};

export const authModelReducer = (
  state = initialState,
  action: AuthActionTypes,
) => {
  switch (action.type) {
    case 'AUTH_GET_REQUEST': {
      return {
        ...state,
        isGetLoading: true,
      };
    }

    case 'AUTH_GET_SUCCESS': {
      return {
        ...state,
        isGetLoading: false,
      };
    }

    case 'AUTH_GET_FAILURE': {
      return {
        ...state,
        isGetLoading: false,
      };
    }

    case 'AUTH_POST_REQUEST': {
      return {
        ...state,
        isPostLoading: true,
      };
    }

    case 'AUTH_POST_SUCCESS': {
      return {
        ...state,
        isPostLoading: false,
      };
    }

    case 'AUTH_POST_FAILURE': {
      return {
        ...state,
        isPostLoading: false,
      };
    }

    case 'AUTH_DELETE_REQUEST': {
      return {
        ...state,
        isDeleteLoading: true,
      };
    }

    case 'AUTH_DELETE_SUCCESS': {
      return {
        ...state,
        isDeleteLoading: false,
      };
    }

    case 'AUTH_DELETE_FAILURE': {
      return {
        ...state,
        isDeleteLoading: false,
      };
    }

    default: {
      return state;
    }
  }
};
