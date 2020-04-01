import * as dateFns from 'date-fns';

import { convertToFloat } from 'utils/converter';

import {
  fullDate,
  fullDateTime,
} from 'constants/dateFormats';

const currencyFormatter = new Intl.NumberFormat('en-CA', {
  currency: 'CAD',
  minimumFractionDigits: 2,
  style: 'currency',
});

export const formatTitle = (title: string) => (
  title.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
);

export const formatDatabaseDateToPrettyDate = (originalDate: string) => (
  dateFns.format(new Date(originalDate.replace(' ', 'T')), fullDate)
);

export const formatDatabaseDateToPrettyDateTime = (originalDate: string) => (
  dateFns.format(new Date(originalDate.replace(' ', 'T')), fullDateTime)
);

export const formatLocationPathToTitle = (title: string) => {
  const titleSlashArray = title.split('/');
  let firstPathItemInURL = titleSlashArray[0];
  titleSlashArray[0] === '' ?
    firstPathItemInURL = titleSlashArray[1] : firstPathItemInURL = titleSlashArray[0];

  return firstPathItemInURL.replace(/\w\S*/g, (txt) =>
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

export const formatPhoneNumber = (phoneNumber: string) => {
  const regexObj = /^(?:\+?1[-. ]?)?(?:\(?([0-9]{3})\)?[-. ]?)?([0-9]{3})[-. ]?([0-9]{4})$/;
  const parts = phoneNumber.match(regexObj);
  if (regexObj.test(phoneNumber) && parts) {
    let formattedNumber = '';
      if (parts[1]) {
        formattedNumber += `(${parts[1]}) `;
      }
      formattedNumber += `${parts[2]}-${parts[3]}`;

      return formattedNumber;
  }

  return phoneNumber;
};

export const formatCurrency = (amount?: string | number) => (
  currencyFormatter.format(convertToFloat(amount))
);

export const formatNumber = (amount?: string | number, digits = 0) => {
  const numberFormatter = new Intl.NumberFormat('en-CA', {
    minimumFractionDigits: digits,
    style: 'decimal',
  });

  return numberFormatter.format(convertToFloat(amount));
};

export const formatToSnakeCase = (s: string) => (
  s.replace(/(?:^|\.?)([A-Z])/g, (_, y: string) => `_${y.toLowerCase()}`).replace(/^_/, '')
);
