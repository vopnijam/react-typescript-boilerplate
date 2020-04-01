import * as React from 'react';
import {
  Redirect,
  Route,
} from 'react-router-dom';

export class RedirectRoute extends Route {
  public render() {
    if (window.location.pathname === '' || window.location.pathname === '/') {
      const renderComponent = () => (<Redirect to={{pathname:  '/login'}}/>);

      return <Route {...this.props} component={renderComponent} render={undefined}/>;
    }

    return <Route {...this.props} />;
  }
}
