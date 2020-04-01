import styled from 'styled-components';

export const Card = styled.div`
  overflow: auto;
  background-color: ${({ theme }: {theme: ITheme}) => theme.colors.white};
  ${({ theme }: {theme: ITheme}) => theme.shadows[1]};
  padding: 12px;
  border-radius: 6px;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
  margin: 2px 2px 10px 0;
`;
