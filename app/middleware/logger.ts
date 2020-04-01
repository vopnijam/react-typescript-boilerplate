import { Middleware } from 'redux';

export const logger: Middleware = () => (next) => (action) => {
  console.log(action); // tslint:disable-line: no-console

  return next(action);
};
