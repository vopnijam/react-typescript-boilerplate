import { store } from 'app';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { config } from 'constants/config';
import { countries, provinces } from 'constants/places';
import { timezones } from 'constants/timezones';

import { cancelNotify, destroyNotify } from 'store/containers/app/actions';

export const generateUuidV4 = () => (
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0; // tslint:disable-line  no-bitwise
    const v = c === 'x' ? r : (r & 0x3 | 0x8); // tslint:disable-line  no-bitwise

    return v.toString(16);
  })
);

export const generateToast = (
  message: string, type: NotifyType,
): INotify => {
  const notify = {
    id: generateUuidV4(),
    isOpen: true,
    message,
    type,
  };

  // Destroy Notify removes it from the toasts array, this is why we double the time,
  // to make sure the first action happens
  window.setTimeout(() => {
    store.dispatch(cancelNotify(notify));
  }, config.toastTimeoutSeconds * 1000);
  window.setTimeout(() => {
    store.dispatch(destroyNotify(notify));
  }, config.toastTimeoutSeconds * 1000 * 2);

  return notify;
};

export const generateProvincesAsSelectItems = (): ISelectItem[] => provinces.map((province) => ({
  key: province.code,
  value: province.name,
}));

export const generateCountriesAsSelectItems = (): ISelectItem[] => countries.map((country) => ({
  key: country.code,
  value: country.name,
}));

export const generateTimezonesAsSelectItems = (): ISelectItem[] => timezones.map((timezone) => ({
  key: timezone.timezone,
  value: timezone.timezone,
}));

export const generateMaskFromType = (maskType: string): false | Array<(string | RegExp)> => {
  switch (maskType) {
    case 'postalCode': {
      return [/[A-Z]/i, /\d/, /[A-Z]/i, ' ', /\d/, /[A-Z]/i, /\d/];
    }

    case 'phone': {
      return ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    }

    case 'currency': {
      // tslint:disable no-unsafe-any
      return createNumberMask({
        allowDecimal: true,
        allowNegative: true,
        decimalLimit: 2,
        includeThousandsSeparator: true,
        integerLimit: 11,
        prefix: '$',
        suffix: '',
      });
      // tslint:enable
    }

    case 'text': {
      return Array.apply(undefined, Array(1024)).map(() => /./);
    }

    default: {
      return false;
    }
  }
};
