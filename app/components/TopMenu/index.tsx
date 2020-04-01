import * as React from 'react';
import styled, { withTheme } from 'styled-components';

import { formatDatabaseDateToPrettyDateTime } from 'utils/format';

import {
  bell,
  x,
} from 'assets/icons';
import circleCheck from 'assets/svgs/CircleCheck.svg';
import circleExclamation from 'assets/svgs/CircleExclamation.svg';
import LoadingDotsSvg from 'assets/svgs/LoadingDots.svg';

import { Icon } from 'components/Icon';
import { LoadingDots } from 'components/LoadingDots';

import {
  largeDesktopMQ,
  largeMobileMQ,
  largeTabletMQ,
  smallTabletMQ,
} from 'styles/breakpoints';

const ICON_SIZE = 30;

export const Row = styled.div`
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Column = styled.div`
  display: flex;
  align-items: center;
  ${({ colSize }: { colSize: number }) => `flex: ${colSize}`};
  font-size: 1em;
  text-align: left;
`;

const TopMenuContainer = styled.div`
  background-color: unset;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  align-items: center;

  padding: 25px 50px;

  ${largeTabletMQ('padding: 15px 35px')}

  ${({ theme }: { theme: ITheme }) => smallTabletMQ(`
    padding: 20px 25px;
    ${theme.colors.gradient.primary};
  `)};

  ${largeMobileMQ('padding: 12px')}
`;

const BellIcon = styled(Icon)`
  ${({ theme }: { theme: ITheme }) => smallTabletMQ(`
    padding-left: 12px;
    & svg {
      fill: ${theme.colors.white};
    }
  `)};
`;

const ClickableDiv = styled.div`
  cursor: pointer;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: flex-end;
  margin: -5px 0px 0px -28px;
  position: absolute;
`;

const Title = styled.h1`
  visibility: hidden;
  color: ${({ theme }: {theme: ITheme}) => theme.colors.white};
  ${smallTabletMQ('visibility: visible;')};
  ${largeMobileMQ('font-size: 18px')};
`;

const FlexDiv = styled.div`
  display: flex;
`;

const FlexEndColumn = styled(Column)`
  justify-content: flex-end;
`;

const LeftLoadingDots = styled(LoadingDots)`
  ${smallTabletMQ(`
    display: none;
    content:url(${LoadingDotsSvg});
  `)};
`;

const RightLoadingDots = styled(LoadingDots)`
  display: none;
  ${smallTabletMQ(`
    display: initial;
    content:url(${LoadingDotsSvg});
  `)};
`;

const CenteredColumn = styled(Column)`
  justify-content: center;
`;

const Menu = styled.div`
  position: absolute;
  top: 63px;
  margin-left: 40px;
  ${largeDesktopMQ(`
    right: 12px;
    margin-left: 0;
  `)}
  overflow-y: scroll;
  max-height: ${({ isMenuOpen }: {isMenuOpen: boolean}) => isMenuOpen ? '50%' : '0'};
  transition: max-height .5s ease;
  z-index: 100;
`;

const MenuItem = styled.div`
  margin-bottom: 6px;
  max-width: 500px;
  padding: 12px;
  background-color: ${({ theme }: {theme: ITheme}) => theme.colors.white};
  border-radius: 3px;
  ${({ theme }: {theme: ITheme}) => theme.shadows[0]};
  cursor: pointer;
`;

const MenuTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const MenuTitleText = styled.h2`
  margin-right: 24px;
`;

const MenuReadIndicator = styled.img`
  margin: 0 3px -5px 0;
`;

const MenuCloseButton = styled(Icon)`
  cursor: pointer;
  z-index: 101;
  border-radius: 50%;
  height: 25px;
  width: 25px;
  text-align: center;
  transition: background-color .3s linear;

  :hover {
    background-color: ${({ theme }: {theme: ITheme}) => theme.colors.grey[3]};

  }

  svg {
    margin-top: 2px;
  }
`;

const MenuMessage = styled.h3`
  margin: 6px 0 2px 0;
`;

const MenuSubMessage = styled.span`
  color: ${({ theme }: {theme: ITheme}) => theme.colors.grey[1]};
`;

class TopMenuComponent extends React.PureComponent<ITopMenuProps> {
  private triggerRef?: HTMLDivElement;
  private menuRef?: HTMLDivElement;

  public readonly state: ITopMenuState = {
    isMenuOpen: false,
  };

  public componentDidMount = () => {
    document.addEventListener('mousedown', this.handleCheckForOutsideClick);
  }

  public componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.handleCheckForOutsideClick);
  }

  private readonly setMenuRef = (node: HTMLDivElement) => {
    this.menuRef = node;
  }

  private readonly setTriggerRef = (node: HTMLDivElement) => {
    this.triggerRef = node;
  }

  private readonly handleCheckForOutsideClick = (event: MouseEvent) => {
    if (this.triggerRef?.contains(event.target as Node | null) && this.state.isMenuOpen) {
      this.handleSetIsMenuOpen(false);
    } else if (this.triggerRef?.contains(event.target as Node | null) && !this.state.isMenuOpen) {
      this.handleSetIsMenuOpen(true);
    } else if (!this.menuRef?.contains(event.target as Node | null)) {
      this.handleSetIsMenuOpen(false);
    }
  }

  private readonly handleSetIsMenuOpen = (isMenuOpen: boolean) => {
    if (this.state.isMenuOpen !== isMenuOpen) {
      this.setState((prevState) => ({
        ...prevState,
        isMenuOpen,
      }));
    }
  }

  public render = () => {
    const numNotifications: number = this.props.notifications.reduce((total: number, n) => (
      total + (n.status === 'unread' ? 1 : 0)
    ), 0);

    let notificationIndicator;
    if (numNotifications >= 9) {
      notificationIndicator = '9+';
    } else if (numNotifications > 0) {
      notificationIndicator = numNotifications.toString();
    }

    return (
      <TopMenuContainer>
        <Column colSize={1}>
          <Row>
            {this.props.isApiLoading && (
              <LeftLoadingDots
                height={ICON_SIZE}
                width={ICON_SIZE}
              />
            )}
          </Row>
        </Column>
        <CenteredColumn colSize={1}>
          <Title>{this.props.title}</Title>
        </CenteredColumn>
        <FlexEndColumn colSize={1}>
          <Row>
            {this.props.isApiLoading && (
              <RightLoadingDots
                height={ICON_SIZE}
                width={ICON_SIZE}
              />
            )}
            <ClickableDiv
              ref={this.setTriggerRef}
            >
              <BellIcon
                appendage={notificationIndicator}
                path={bell}
                fill={this.props.theme.colors.black}
                height={ICON_SIZE}
                width={ICON_SIZE}
              />
            </ClickableDiv>
          </Row>
          <Menu
            isMenuOpen={this.state.isMenuOpen}
            ref={this.setMenuRef}
          >
            {this.props.notifications.map((n: INotification) => (
              <MenuItem
                key={`top-menu-item-${n.id}`}
                onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                  e.preventDefault();
                  e.stopPropagation();

                  if (n.url) {
                    this.props.handleChangePage(n.url);
                  }

                  this.props.handlePatchNotification({
                    ...n,
                    status: 'read',
                  });
                }}
              >
                <MenuTitle>
                  <FlexDiv>
                    <MenuReadIndicator
                      src={n.status === 'read' ? circleCheck : circleExclamation}
                    />

                    <MenuTitleText>
                      {n.title}
                    </MenuTitleText>
                  </FlexDiv>

                  <MenuCloseButton
                    path={x}
                    fill={this.props.theme.colors.black}
                    height={20}
                    width={20}
                    // @ts-ignore
                    onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                      e.preventDefault();
                      e.stopPropagation();
                      this.props.handleDeleteNotification(n);
                    }}
                  />
                </MenuTitle>

                <MenuMessage>
                  {n.message}
                </MenuMessage>

                <MenuSubMessage>
                  {formatDatabaseDateToPrettyDateTime(n.createdAt)}
                </MenuSubMessage>
              </MenuItem>
            ))}
            {this.props.notifications.length === 0 && (
              <MenuItem
                key={`top-menu-item-no-notification`}
              >
                <MenuTitle>
                  <FlexDiv>
                    <MenuTitleText>
                      You have no notifications
                    </MenuTitleText>
                  </FlexDiv>
                </MenuTitle>
              </MenuItem>
            )}
          </Menu>
        </FlexEndColumn>
      </TopMenuContainer>
    );
  }
}

export const TopMenu = withTheme(TopMenuComponent);
