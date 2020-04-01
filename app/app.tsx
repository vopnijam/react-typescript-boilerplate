import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import configureStore from 'store';

import Globals from 'styles/globals';
import Normalize from 'styles/normalize';
import { theme } from 'styles/theme';

import { RedirectRoute } from 'components/RedirectRoute';

import App from 'containers/App';
import Login from 'containers/Login';
import Maintenance from 'containers/Maintenance';
import NotFound from 'containers/NotFound';

export const store = configureStore();

const GlobalStyle = createGlobalStyle`${Normalize}${Globals}`;

render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <GlobalStyle />
      <Router>
        <App>
          <Switch>
            <Route
              path="/login"
              component={Login}
            />

            <Route
              path="/maintenance"
              component={Maintenance}
            />

            <RedirectRoute
              path="/"
              component={NotFound}
            />
          </Switch>
        </App>
      </Router>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root'),
);
