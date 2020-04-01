export const convertHexToRgb = (cssHex: cssHex, opacity?: number) => (
  `rgba(
    ${parseInt(cssHex.slice(1, 3), 16)},
    ${parseInt(cssHex.slice(3, 5), 16)},
    ${parseInt(cssHex.slice(5, 7), 16)},
    ${opacity ? opacity : 1}
  )`
);

export const convertToFloat = (str?: string | number, fallback = 0) => (
  parseFloat(str ? `${str}` : `${fallback}`) || fallback
);

export const convertToInt = (str?: string | number, fallback = 0) => (
  parseInt(str ? `${str}` : `${fallback}`, 10) || fallback
);

export const unicodeEscape = {
  ampersand: '\u0026',
  backSlash: '\u005C',
  doubleQuote: '\u0022',
  singleQuote: '\u0027',
  space: '\u00A0',
};
