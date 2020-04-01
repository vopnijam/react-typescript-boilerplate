import styled from 'styled-components';

import { largeMobileMQ, smallTabletMQ } from 'styles/breakpoints';

export const TabbedMenu = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;

  ${smallTabletMQ(`
    padding-top: 6px;
  `)};

  ${largeMobileMQ(`
    overflow: hidden;
    padding-top: 0;
  `)};
`;

export const Tab = styled.h3`
  display: inline;
  cursor: pointer;
  padding: 0 6px 3px 6px;
  font-size: 18px;
  color: ${({ theme }: {theme: ITheme}) => theme.colors.grey[1]};
  font-weight: 200;
  border-bottom: 3px solid transparent;
  margin-right: 18px;

  ${({ isActive, theme }: { isActive: boolean; theme: ITheme }) => isActive && `
    color: ${theme.colors.black};
    font-weight: 400;
    border-bottom: 3px solid ${theme.colors.yellow[0]};
  `}

  :hover {
    border-bottom: 3px solid ${({ theme }: {theme: ITheme}) => theme.colors.yellow[0]};
  }

  ${largeMobileMQ(`
    padding: 0 3px;
  `)};
`;
