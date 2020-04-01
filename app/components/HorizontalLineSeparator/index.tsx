import styled from 'styled-components';

export const HorizontalLineSeparator = styled.div`
  height: 0;
  border: solid 1px ${({ theme }: {theme: ITheme}) => theme.colors.black};
  margin: 16px 0;
  opacity: 0.08;
`;
