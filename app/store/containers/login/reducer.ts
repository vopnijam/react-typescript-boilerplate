const initialState: ILoginContainerState = {
};

export const loginReducer = (
  state = initialState,
  action: LoginActionTypes,
) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
