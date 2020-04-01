import * as React from 'react';
import styled, { keyframes } from 'styled-components';

import { Card } from 'components/Card';
import { HorizontalLineSeparator } from 'components/HorizontalLineSeparator';
import { Icon } from 'components/Icon';

import { largeMobileMQ, smallTabletMQ } from 'styles/breakpoints';

import { x } from 'assets/icons';

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;
  width: 100%;
  max-height: 100%;

  ${smallTabletMQ(`min-width: 100%`)};
`;

export const Row = styled.div`
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const LargeModalContent = styled(ModalContent)`
  min-width: 300px;
`;

export const SmallModalContent = styled(ModalContent)`
  min-width: 200px;
  min-height: initial;
`;

export const ModalTitle = styled.h2`
  width: 100%;
`;

const fadeInBackground = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 0.7;
  }
`;

const fadeOutBackground = keyframes`
  from {
    opacity: 0.7;
  }

  to {
    opacity: 0;
  }
`;

const Greyed = styled.div<{
  isOpen: boolean;
  isUnderneath: boolean;
  theme: ITheme;
}>`
  position: absolute;
  display: flex;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }: {theme: ITheme}) => theme.colors.black};
  opacity: ${({ isUnderneath }: {isUnderneath: boolean}) => isUnderneath ? '0' : '0.75'};
  z-index: 98;
  visibility: ${({ isOpen }: {isOpen: boolean}) => isOpen ? 'visible' : 'hidden'};
  animation: ${({ isOpen }: {isOpen: boolean}) =>
    isOpen ? fadeInBackground : fadeOutBackground} 0.3s linear;
  transition: opacity 0.3s ease-in-out;
`;

const fadeIn = keyframes`
  from {
    transform: scale(0.25);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }

  to {
    opacity: 0;
    transform: scale(0.25);
  }
`;

const Container = styled.div<{
  isOpen: boolean;
  isUnderneath: boolean;
  theme: ITheme;
}>`
  position: absolute;
  display: flex;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  z-index: ${({isUnderneath}: {isUnderneath: boolean}) => isUnderneath ? '97' : '99'};
  visibility: ${({isOpen}: {isOpen: boolean}) => isOpen ? 'visible' : 'hidden'};
  animation: ${({isOpen}: {isOpen: boolean}) => isOpen ? fadeIn : fadeOut} 0.3s ease-out;
  transition: visibility 0.3s ease-in-out;
  margin: 12px;
  max-height: 100%;

  ${largeMobileMQ(`
    margin: 3px;
  `)};
`;

const Content = styled(Card)`
  display: flex;
  padding: 24px;
  max-height: 100%;
  flex-direction: column;

  ${({isFullHeight}: {isFullHeight: boolean}) => isFullHeight && `
    display: flex;
    flex: 1 1 100%;
    height: 100%;
  `};

  ${smallTabletMQ(`
    width: 100%;
    padding: 16px;
  `)};


  ${largeMobileMQ(`
    padding: 12px;
  `)};
`;

const ClickableIcon = styled(Icon)`
  cursor: pointer;
`;

const ModalContainer = styled.div`
`;

const FixedHeader = styled.div`
  display: flex;
  flex: 1 1 58px;
  flex-direction: column;
`;

const FixedContent = styled.div`
  display: flex;
  flex: 1 1 100%;
  overflow: auto;
`;

const FixedFooter = styled.div`
  display: flex;
  flex: 1 1 71px;
  flex-direction: column;
  justify-content: flex-end;
`;

export const Modal: React.FC<IModalProps> = ({
  mainContent, footerContent, isOpen, title, handleCloseModal, isFullHeight = false,
  isUnderneath = false,
}) => (
  <ModalContainer>
    <Greyed
      isOpen={isOpen}
      isUnderneath={isUnderneath}
    />

    <Container
      isOpen={isOpen}
      isUnderneath={isUnderneath}
    >
      <Content
        isFullHeight={isFullHeight}
      >
        <FixedHeader>
          <Row>
            <ModalTitle>
              {title}
            </ModalTitle>
            <ClickableIcon
              path={x}
              onClick={handleCloseModal}
            />
          </Row>

          <HorizontalLineSeparator/>
        </FixedHeader>

        {isOpen && (
          <FixedContent>
            {mainContent}
          </FixedContent>
        )}

        <FixedFooter>
          <HorizontalLineSeparator />

          {footerContent}
        </FixedFooter>
      </Content>
    </Container>
  </ModalContainer>
);
