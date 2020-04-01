import * as React from 'react';

import loadingDotsSvg from 'assets/svgs/LoadingDots.svg';

export const LoadingDots: React.FC<ILoadingDotsProps> = (props) => (
  <img
    className={props.className}
    src={loadingDotsSvg}
    height={props.height || 24}
    width={props.width || 24}
  />
);
