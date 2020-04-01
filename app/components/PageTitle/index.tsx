import styled from 'styled-components';

import {
  smallTabletMQ,
} from 'styles/breakpoints';

const Title = styled.h1`
  width: 100%;
  display: inline-block;
  height: 38px;

  ${smallTabletMQ('display: none;')};
`;

export default Title;
