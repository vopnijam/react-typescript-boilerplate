// Our primary color is blue[0] #392DD8
// Our secondary color is yellow[0] #F7A214

// For the different 'types' in the system:
// Customers: #F7A214
// Users: #F78F14
// Quotes: #14BCD6
// Jobs: #0C84FF
// Invoices: #AC5FDD
// Receipts: #7A3E9E
// Personal Event: #F51F5A

const colors: IColorPalette = {
  blue: [
    '#392DD8',
    '#14BCD6',
    '#0C84FF',
  ],

  purple: [
    '#AC5FDD',
    '#7A3E9E',
  ],

  yellow: [
    '#F7A214',
    '#F78F14',
    '#FFEAC7',
  ],

  grey: [
    '#6E808F',
    '#79859E',
    '#F3F4F6',
    '#E0E0E0',
  ],

  green: [
    '#518C6C',
    '#CAEDDA',
  ],

  red: [
    '#E90909',
    '#F6D4D4',
    '#F51F5A',
  ],

  white: '#FFFFFF',

  black: '#000000',

  gradient: {
    primary: `background-image:
      linear-gradient(
        125deg,
        #392DD8 0%,
        #392ED5 37%,
        #2419BA 100%
      );
    `,
  },
};

export default colors;
