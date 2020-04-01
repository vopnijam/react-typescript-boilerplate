export const config: IConfig = {
  nonErrorApiCalls: {
    delete: [
      'auth',
    ],
    get: [
      'auth',
    ],
    patch: [],
    post: [],
  },
  toastTimeoutSeconds: 5,
  unauthenticatedContainerWidth: 320,
};
