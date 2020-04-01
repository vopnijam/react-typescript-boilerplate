import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { destroyNotify } from 'store/containers/app/actions';

import { config } from 'constants/config';

import { smallTabletMQ } from 'styles/breakpoints';

const ToastContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;

  ${smallTabletMQ(`
    width: 100%;
  `)}
`;

const ToastPopup = styled.div`
  width: 400px;
  border-radius: 5px;
  display: flex;
  ${({ isOpen }: {isOpen: boolean}) => !isOpen && `visibility: hidden`};
  margin: 12px;
  padding: 24px;
  z-index: 100;
  ${({ theme }: {theme: ITheme}) => theme.shadows[1]};
  top: -320px;

  ${smallTabletMQ(`
    max-width: 100%;
    width: auto;
    padding: 12px;
  `)}

  animation: moveToast ${config.toastTimeoutSeconds}s ease-in;

  @keyframes moveToast {
    85% {
      opacity: 1;
      transform: translateX(0);
    }
    100% {
      opacity: 0;
      transform: translateX(320px);
    }
  }

  ${({ notifyType, theme }: ({ notifyType?: InfoBannerType; theme: ITheme })) => {
    switch (notifyType) {
      case 'Error':
        return `
          background-color: ${theme.colors.white};
          color: ${theme.colors.red[0]};
        `;
      case 'Warning':
        return `
          background-color: ${theme.colors.white};
          color: ${theme.colors.yellow[1]};
        `;
      case 'Success':
        return `
          background-color: ${theme.colors.white};
          color: ${theme.colors.green[0]};
        `;
      case 'Neutral':
        return `
          background-color: ${theme.colors.white};
          color: ${theme.colors.black};
        `;
      default:
        return `
          background-color: ${theme.colors.white};
          color: ${theme.colors.green[0]};
        `;
    }
  }}
`;

const ToastMessage = styled.div`
  font-size: 1.3em;
  width: 100%;
  align-self: center;
  word-break: break-word;
`;

const CloseButton = styled.div`
  font-size: 1.1em;
  align-self: center;
  margin-left: 24px;
  cursor: pointer;

  :before {
    content: "Dismiss";

    ${({ notifyType, theme }: ({ notifyType?: InfoBannerType; theme: ITheme })) => {
      switch (notifyType) {
        case 'Error':
          return `color: ${theme.colors.red[0]};`;
        case 'Warning':
          return `color: ${theme.colors.yellow[1]};`;
        case 'Success':
          return `color: ${theme.colors.green[0]};`;
        case 'Neutral':
          return `color: ${theme.colors.black};`;
        default:
          return `color: ${theme.colors.green[0]};`;
      }
    }}
  }
`;

class Toasts extends React.PureComponent<IToastsProps> {
  private readonly handleClose = (toast: INotify) => {
    this.props.dispatch(destroyNotify(toast));
  }

  public render = () => (
    <ToastContainer>
      {this.props.toasts.map((toast: INotify) => /* tslint:disable-line no-unsafe-any */
        <ToastPopup
          key={toast.id}
          isOpen={toast.isOpen}
        >
          <ToastMessage>
            {toast.message}
          </ToastMessage>

          <CloseButton
            notifyType={toast.type}
            onClick={() => { this.handleClose(toast); }}
          />
        </ToastPopup>,
      )}
    </ToastContainer>
  )
}

const mapDispatchToProps = (dispatch: ReduxDispatch) => ({
  dispatch,
});

export default connect(
  mapDispatchToProps,
)(Toasts);
