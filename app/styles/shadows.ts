import { convertHexToRgb } from 'utils/converter';

import colors from 'styles/colors';

export const shadows: string[] = [
  `box-shadow: 0 1px 6px ${convertHexToRgb(colors.grey[1], 0.25)};`,
  `box-shadow: 0 3px 15px ${convertHexToRgb(colors.grey[1], 0.25)};`,
];

export const raiseUp = (from?: number, to = 1, time = 0.3) => `
  ${from ? shadows[from] : ''};

  :hover {
    ${shadows[to]};
  }

  transition: box-shadow ${time}s cubic-bezier(.25,.8,.25,1);
`;

export default shadows;
