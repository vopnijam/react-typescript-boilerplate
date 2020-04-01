import * as React from 'react';
import styled, { ThemeContext } from 'styled-components';

import { Icon } from 'components/Icon';

const Button = styled.button<{
  fill?: string;
  inverted?: boolean;
  isClickable: boolean;
  size: number;
  theme: ITheme;
}>`
  width: ${({ size }: { size: number }) => size}px;
  height: ${({ size }: { size: number }) => size}px;
  min-height: ${({ size }: { size: number }) => size}px;
  min-width: ${({ size }: { size: number }) => size}px;
  box-sizing: border-box;
  border: none;
  border-radius: ${({ size }: { size: number }) => size}px;
  text-transform: uppercase;
  outline: none;

  ${({ inverted, fill, theme}: {inverted?: boolean; fill?: string; theme: ITheme}) => inverted ? `
    border: 1px solid ${fill};
    background-color: ${theme.colors.white};
  ` : `
    border: none;
    background-color: ${fill};
  `};

  ${({ isClickable }: { isClickable: boolean }) => isClickable && 'cursor: pointer;'};
`;

const Text = styled.span<{
  fill?: string;
  inverted?: boolean;
  theme: ITheme;
}>`
${({ inverted, fill, theme }: {inverted?: boolean; fill?: string; theme: ITheme}) => inverted ? `
    color: ${fill};
  ` : `
    color: ${theme.colors.white};
  `};
`;

export const Avatar: React.FC<IAvatarProps> = ({
  className, fill, onClick, path, inverted, size, text,
}) => {
  const theme: ITheme = React.useContext(ThemeContext) as ITheme;

  const _fill = fill || theme.colors.yellow[0];

  return (
    <Button
      className={className}
      fill={_fill}
      inverted={inverted}
      isClickable={!!onClick}
      onClick={onClick}
      size={size || 24}
    >
      {path ?
        <Icon
          fill={theme.colors.white}
          height={size || 24}
          path={path}
          width={size || 24}
        />
      : (
        <Text
          fill={_fill}
          inverted={inverted}
        >
          {text}
        </Text>
      )}
    </Button>
  );
};
