import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { UnauthenticatedContainer } from 'components/UnauthenticatedContainer';

import LoginForm from 'forms/Login';

import { AppState } from 'store';
import { authPostRequestAction } from 'store/models/auth/actions';

const StyledLoginForm = styled(LoginForm)`
  width: 260px;
  text-align: left;
`;

class Login extends React.PureComponent<ILoginProps & ReduxRouteProps> {
  private readonly handleLogin = (data: IAuthForm) => {
    this.props.dispatch(authPostRequestAction({
      email: data.email,
      historyPush: (path) => { this.props.history.push(path); },
      password: data.password,
    }));
  }

  public render = () => (
    <UnauthenticatedContainer
      title="React Typescript Boilerplate"
      subtitle="A React UI leveraging TypeScript, React, Redux, Redux-Sagas, Styled-Components, and Webpack"
      isLoading={this.props.authModel.isPostLoading}
      mainContent={(
        <StyledLoginForm
          onSubmit={this.handleLogin}
          isLoading={this.props.authModel.isPostLoading}
        />
      )}
    />
  )
}

const mapStateToProps = (state: AppState) => ({
  authModel: state.models.auth,
  loginContainer: state.containers.login,
});

const mapDispatchToProps = (dispatch: ReduxDispatch) => ({
  dispatch,
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login));
