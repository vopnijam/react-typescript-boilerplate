import * as React from 'react';
import styled from 'styled-components';

import { config } from 'constants/config';

import { Card } from 'components/Card';
import { LoadingDots } from 'components/LoadingDots';

import { smallMobileMQ } from 'styles/breakpoints';

import Logo from 'assets/svgs/Logo.svg';

const CONTAINER_SIZE = config.unauthenticatedContainerWidth;

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;

  ${({ theme }: { theme: ITheme }) => theme.colors.gradient.primary};
`;

const Container = styled(Card)`
  width: ${({ width }: { width: number }) => width}px;
  max-height: 100%;

  flex-direction: column;

  ${smallMobileMQ(`
    margin: 12px;
  `)}
`;

const TopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 18px;
  text-align: center;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubtitleWrapper = styled.h3`
  margin: 0.5em 0 2em 0;
`;

export const UnauthenticatedContainer: React.FC<IUnauthenticatedContainerProps> = ({
  title, mainContent, isLoading, src, subtitle, width,
}) => (
  <PageContainer>
    <Container
      width={width || CONTAINER_SIZE}
    >
      {src !== 'None' && (
        <TopContainer>
          {isLoading ? (
            <LoadingDots
              height={200}
              width={200}
            />
          ) : (
            <img
              src={src || Logo}
              height={!src ? 200 : undefined}
              width={200}
            />
          )}
        </TopContainer>
      )}

      <BottomContainer>
        <Header>
          {isLoading ? (
            <h2>Loading...</h2>
          ) : (
            <h2>{title}</h2>
          )}
          {subtitle && (
            <SubtitleWrapper>
              {subtitle}
            </SubtitleWrapper>
          )}
        </Header>
        {mainContent}
      </BottomContainer>
    </Container>
  </PageContainer>
);
