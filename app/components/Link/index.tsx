import * as React from 'react';
import styled from 'styled-components';

import { Link as ReactRouterLink } from 'react-router-dom';

const PrettyLink = styled(ReactRouterLink)`
  color: ${({ theme }: {theme: ITheme}) => theme.colors.blue[0]};
  box-sizing: border-box;
  text-decoration: none;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`;

const DisabledLink = styled.a`
  box-sizing: border-box;
  text-decoration: none;
  cursor: not-allowed;
  color: ${({ theme }: {theme: ITheme}) => theme.colors.grey[2]};
`;

export const Link: React.FC<ILinkProps> = ({name, to, isDisabled, className}) => {
  if (isDisabled) {
    return <DisabledLink className={className}>{name}</DisabledLink>;
  }

  return <PrettyLink to={to} className={className}>{name}</PrettyLink>;
};
