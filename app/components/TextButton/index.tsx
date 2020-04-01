import * as React from 'react';
import styled from 'styled-components';

const Link = styled.span`
  ${({ color, theme }: {color?: string; theme: ITheme}) => (
    `color: ${color || theme.colors.blue[0]}`
  )};
  box-sizing: border-box;
  text-decoration: none;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`;

export const TextButton: React.FC<ITextButtonProps> = ({name, onClick, className, color}) => (
  <Link color={color} onClick={onClick} className={className}>{name}</Link>
);
