import * as React from 'react';
import {
  Redirect,
  Route,
} from 'react-router-dom';

import Loading from 'containers/Loading';

import authApi from 'api/auth';

import { AppState } from 'store';
import { authUpdateAction } from 'store/models/auth/actions';

export class PrivateRoute extends Route<IPrivateRoute> {
  public readonly state = {
    isAuth: false,
    isLoading: true,
  };

  public componentDidMount = async () => {
    try {
      const state = this.props.store.getState() as AppState;

      // tslint:disable-next-line no-unsafe-any
      if (state.containers.app?.activeAuth?.isAuth) {
        this.handleStopLoading(true);

        return;
      }

      const auth: IAuth = await authApi.get();
      this.props.store.dispatch(authUpdateAction(auth));

      this.handleStopLoading(!!auth.id);
    } catch {
      this.handleStopLoading(false);
    }
  }

  private readonly handleStopLoading = (isAuth: boolean) => {
    this.setState(() => ({
      isAuth,
      isLoading: false,
    }));
  }

  public render() {
    if (this.state.isLoading) {
      return <Loading />;
    }

    if (this.state.isAuth) {
      return <Route {...this.props}/>;
    }

    const renderComponent = () => (
      <Redirect to={{pathname:  this.props.redirectPath || '/login'}}/>
    );

    return <Route {...this.props} component={renderComponent} render={undefined}/>;
  }
}
