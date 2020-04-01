import colors from 'styles/colors';

export default `
  body {
    font-family: 'Open Sans', sans-serif;
    font-size: 12px;
    line-height: 18px;

    background-color: ${colors.grey[2]};
    color: ${colors.black};
  }

  h1 {
    font-weight: 400;
    font-size: 28px;
    line-height: 38px;
    margin-right: 18px;
  };

  h2 {
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    margin-right: 12px;
  };

  h3 {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    margin-right: 12px;
  };

  h4 {
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
  };

  h5 {
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;

    color: ${colors.grey[0]};
  };

  b {
    font-weight: 700;
  }

  strong {
    font-weight: 800;
  }

  * {
    -ms-overflow-style: none;
  }
`;
