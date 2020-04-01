import * as React from 'react';
import styled from 'styled-components';

import { Avatar } from 'components/Avatar';

const Container = styled.div`
  display: flex;
  align-items: baseline;
`;

const Text = styled.span`
  display: flex;
  margin-left: 12px;
`;

export const LabeledAvatar: React.FC<ILabeledAvatarProps> = ({
  className, fill, id, onClick, size, text,
}) => (
  <Container
    className={className}
    onClick={onClick}
  >
    <Avatar
      fill={fill}
      text={id ? id.toString() : undefined}
      size={size}
    />
    <Text>{text}</Text>
  </Container>
);
