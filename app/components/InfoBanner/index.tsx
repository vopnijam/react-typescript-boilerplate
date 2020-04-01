import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from 'store';
import styled from 'styled-components';

const InfoBannerPopup = styled.div`
  display: flex;
  padding: 12px;
  margin: 0;
  width:100%;
  z-index: 10;
  box-sizing: border-box;

  &.closed {
    display: none;
  }

  ${({ notifyType, theme }: ({ notifyType?: InfoBannerType; theme: ITheme })) => {
    switch (notifyType) {
      case 'Error':
        return `
          background-color: ${theme.colors.red[1]};
          color: ${theme.colors.red[0]};
        `;
      case 'Warning':
        return `
          background-color: ${theme.colors.yellow[2]};
          color: ${theme.colors.yellow[1]};
        `;
      case 'Success':
        return `
          background-color: ${theme.colors.green[1]};
          color: ${theme.colors.green[0]};
        `;
      default:
        return `
          background-color: ${theme.colors.green[1]};
          color: ${theme.colors.green[0]};
        `;
    }
  }}
`;

const InfoBannerMessage = styled.div`
  font-size: 1.2em;
  width: 100%;
  text-align: center;
`;

class InfoBanner extends React.PureComponent<IInfoBannerProps> {
  public render = () => (
    <InfoBannerPopup
      notifyType={this.props.infoBanner.type}
      className={'closed'}
    >
      <InfoBannerMessage>
        {this.props.infoBanner.message}
      </InfoBannerMessage>

    </InfoBannerPopup>
  )
}

const mapStateToProps = (state: AppState) => ({
  infoBanner: state.containers.app.infoBanner,
});

const mapDispatchToProps = (dispatch: ReduxDispatch) => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InfoBanner);
