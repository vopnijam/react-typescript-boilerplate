import * as React from 'react';
import styled, { ThemeContext } from 'styled-components';

import { raiseUp } from 'styles/shadows';

const PrettyButton = styled.button<{
  fill: cssHex; isInverted: boolean; isDisabled: boolean; isRound: boolean; theme: ITheme;
}>`
  box-sizing: border-box;
  cursor: pointer;
  text-transform: uppercase;
  outline: none;
  ${raiseUp()};
  white-space: nowrap;
  text-align: center;

  border-radius: ${({isRound}) => isRound ? '25% / 50%' : '6px'};

  ${({ isInverted, fill, theme}: {isInverted: boolean; fill: string; theme: ITheme}) => isInverted ? `
    border: 1px solid ${fill};
    padding: 11px 23px;
    background-color: ${theme.colors.white};
    color: ${fill};
  ` : `
    border: none;
    padding: 12px 24px;
    background-color: ${fill};
    color: ${theme.colors.white};
  `};

  ${({ isDisabled }: {isDisabled: boolean}) => isDisabled && `
    opacity: 0.5;
    cursor: not-allowed;
    :hover {
      box-shadow: none;
    }
  `}
`;

export const Button: React.FC<IButtonProps> = ({
  className,
  fill,
  isDisabled = false,
  isInverted = false,
  isRound = false,
  onClick,
  text,
  type = 'submit',
}) => {
  const theme: ITheme = React.useContext(ThemeContext) as ITheme;

  return (
    <PrettyButton
      type={type}
      isDisabled={isDisabled}
      disabled={isDisabled}
      className={className}
      fill={fill || theme.colors.blue[0]}
      isInverted={isInverted}
      isRound={isRound}
      onClick={onClick}
    >
      {text}
    </PrettyButton>
  );
};
