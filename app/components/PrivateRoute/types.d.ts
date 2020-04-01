import { RouteProps } from 'react-router-dom';
import { MiddlewareAPI } from 'redux';

declare global {
  interface IPrivateRoute extends RouteProps {
    store: MiddlewareAPI;
    redirectPath?: string;
  }
}
