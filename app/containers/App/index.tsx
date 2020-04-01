import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { AppState } from 'store';

import InfoBanner from 'components/InfoBanner';
import Toasts from 'components/Toasts';
import { TopMenu } from 'components/TopMenu';

import { formatLocationPathToTitle } from 'utils/format';

import {
  initializeWebSocket,
} from 'store/containers/app/actions';

import {
  notificationsDeleteRequestAction,
  notificationsGetsRequestAction,
  notificationsPatchRequestAction,
} from 'store/models/notifications/actions';

import {
  largeMobileMQ,
  largeTabletMQ,
  maxPage,
  smallDesktopMQ,
  smallTabletMQ,
} from 'styles/breakpoints';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }: {theme: ITheme}) => theme.colors.grey[2]};
`;

const ContainerOuter = styled.div`
  display: flex;
  flex-direction: row;
  max-width: ${maxPage}px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

const ContainerInner = styled.div`
  background-color: unset;
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  width: 100%;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  ${({isAuth}: {isAuth: boolean}) => isAuth ? `
    margin: 0 100px 50px 100px;

    ${smallDesktopMQ('margin: 0 50px 25px 50px;')}

    ${largeTabletMQ('margin: 0 35px 25px 35px;')}

    ${smallTabletMQ('margin: 0 25px 25px 25px;')}

    ${largeMobileMQ('margin: 0 12px 0 12px;')}
  ` : 'margin: 0;'};
`;

class App extends React.PureComponent<IAppProps & ReduxRouteProps> {
  private readonly isShowMenus = () => this.props.appContainer?.activeAuth?.isAuth;

  public componentDidUpdate = (prevProps: IAppProps) => {
    if (
      !prevProps.appContainer?.activeAuth?.isAuth &&
      this.props.appContainer?.activeAuth?.isAuth
    ) {
      this.props.dispatch(notificationsGetsRequestAction({showToasts: false}));
      this.props.dispatch(initializeWebSocket('main'));
    }
  }

  private readonly handleDeleteNotification = (notification: INotification) => {
    this.props.dispatch(notificationsDeleteRequestAction(notification));
  }

  private readonly handlePatchNotification = (notification: INotification) => {
    this.props.dispatch(notificationsPatchRequestAction(notification));
  }

  private readonly handleChangePage = (page: string) => {
    this.props.history.push(page);
  }

  public render = () => (
    <Page>
      <InfoBanner /* tslint:disable-line no-unsafe-any */ />
      <ContainerOuter className={this.props.className}>
        <Toasts toasts={this.props.appContainer.toasts}/>

        <ContainerInner>
          {this.isShowMenus() && (
            <TopMenu
              isApiLoading={!!this.props.appContainer.numLoading}
              title={formatLocationPathToTitle(this.props.location.pathname)}
              notifications={this.props.appContainer.activeNotifications}
              handleChangePage={this.handleChangePage}
              handleDeleteNotification={this.handleDeleteNotification}
              handlePatchNotification={this.handlePatchNotification}
            />
          )}

          <Content isAuth={!!this.props.appContainer?.activeAuth?.isAuth}>
            {React.Children.toArray(this.props.children)}
          </Content>
        </ContainerInner>
      </ContainerOuter>
    </Page>
  )
}

const mapStateToProps = (state: AppState) => ({
  appContainer: state.containers.app,
});

const mapDispatchToProps = (dispatch: ReduxDispatch) => ({
  dispatch,
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App));
