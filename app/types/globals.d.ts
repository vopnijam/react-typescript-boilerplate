import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';

import { Path } from 'history';

declare global {
  type ReduxDispatch = Dispatch;
  type ReduxRouteProps = RouteComponentProps;

  // @ts-ignore
  const process: {
    env: {
      API_ENDPOINT: string;
      NODE_ENV: string;
      WEBSOCKET_ENDPOINT: string;
    };
  };

  namespace JSX {
    interface IntrinsicElements { // tslint:disable-line interface-name
      subtitle: {
        children: string;
      };
    }
  }

  interface IGenericObject {
    [key: string]: any; // tslint:disable-line no-any
  }

  interface IGenericErrorObject {
    [key: string]: string | undefined;
  }

  interface IApiResponse {
    data: IGenericObject;
  }

  interface IIsValid {
    reason: string | undefined;
    valid: boolean;
  }

  interface IConfig {
    nonErrorApiCalls: {
      delete: string[];
      get: string[];
      patch: string[];
      post: string[];
    };
    toastTimeoutSeconds: number;
    unauthenticatedContainerWidth: number;
  }

  interface IGenericActionPlaceholder {
    type: string;
  }

  interface IHistory {
    historyPush(path: Path): void;
  }

  interface IErrorResponse {
    response?: {
      data: {
        message: string;
      };
      headers: IGenericObject;
      status: number;
      statusText: string;
    };
    message: string;
  }

  type cssHex = (
    '#000000' |
    '#0C84FF' |
    '#14BCD6' |
    '#392DD8' |
    '#518C6C' |
    '#6E808F' |
    '#79859E' |
    '#7A3E9E' |
    '#AC5FDD' |
    '#CAEDDA' |
    '#E0E0E0' |
    '#E90909' |
    '#F3F4F6' |
    '#F51F5A' |
    '#F6D4D4' |
    '#F78F14' |
    '#F7A214' |
    '#FFEAC7' |
    '#FFFFFF'
  );

  interface IColorPalette {
    blue: cssHex[];
    purple: cssHex[];
    yellow: cssHex[];
    grey: cssHex[];
    green: cssHex[];
    red: cssHex[];

    white: cssHex;
    black: cssHex;

    gradient: {
      primary: string;
    };
  }

  interface ITheme {
    colors: IColorPalette;
    shadows: string[];
  }

  type CountryCode = 'CA';

  type ProvinceCode = (
    'AB' | 'BC' | 'MB' | 'NB' | 'NL' | 'NT' | 'NS' | 'NU' | 'ON' | 'PE' | 'QC' | 'SK' | 'YT'
  );

  interface IProvince {
    code: ProvinceCode;
    countryCode: CountryCode;
    name: string;
  }

  interface ICountry {
    code: CountryCode;
    name: string;
  }

  interface ITimezone {
    countryCode: CountryCode;
    timezone: string;
  }
}
