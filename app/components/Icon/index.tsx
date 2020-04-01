import * as React from 'react';
import styled from 'styled-components';

import { smallTabletMQ } from 'styles/breakpoints';

const Wrapper = styled.div`
  border: none;
  padding: 0;
  margin: 0;

  ${({ appendage, appendageFill, theme }: {
    appendage?: string; appendageFill?: cssHex; theme: ITheme;
  }) => !!appendage && `
    &:after {
      content: '${appendage}';
      position: absolute;
      height: 18px;
      width: 18px;
      font-size: 14px;
      margin-left: -9px;
      margin-top: -6px;
      border-radius: 50%;
      color: ${theme.colors.white};
      background-color: ${appendageFill || theme.colors.yellow[0]};
      text-align: center;
      padding: 3px;
    }
  `}
`;

const IconContainer = styled.svg`
  display: inline-block;
  fill: ${({ fill, theme }: {fill?: string; theme: ITheme}) => fill || theme.colors.black};
  height: ${({ height = 24 }) => height}px;
  min-height: ${({ height = 24 }) => height}px;
  width: ${({ width = 24 }) => width}px;
  min-width: ${({ width = 24 }) => width}px;
  user-select: none;

  ${smallTabletMQ(`
    height: 24px;
    min-height: 24px
  `)};
`;

export const Icon: React.FC<IIconProps> = (props) => (
  <Wrapper
    appendage={props.appendage}
    appendageFill={props.appendageFill}
    className={props.className}
  >
    <IconContainer
      viewBox="0 0 24 24"
      fill={props.fill}
      width={props.width}
      height={props.height}
      // @ts-ignore
      onClick={(e: MouseEvent) => {
        if (props.onClick) {
          props.onClick(e);
        }
      }}
    >
      <path d={props.path}></path>
    </IconContainer>
  </Wrapper>
);
