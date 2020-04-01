import * as React from 'react';
import MaskedInput from 'react-text-mask';
import styled from 'styled-components';

import { generateMaskFromType } from 'utils/generate';

const Wrapper = styled.div<{isDisabled: boolean}>`
  margin-bottom: 1em;

  ${({ isDisabled }: {isDisabled: boolean}) => isDisabled ? `
    cursor: not-allowed;
    opacity: 0.6;
    user-select: none;
  ` :  '' }
`;

const StyledMaskedInput = styled(MaskedInput)<{
  isborderless: string;
  isdisabled: string;
  value: string;
  height: number;
}>`
  width: 100%;
  height: ${({ height }: {height: number}) => height}px;
  box-sizing: border-box;

  transition: border .5s ease-in-out;
  transition: border-color .5s ease-in-out;
  transition: opacity .5s ease-in-out;
  outline: none;
  padding: 12px;

  ${({ isborderless, theme }: {isborderless: string; theme: ITheme}) => (
    isborderless === 'true' ? 'border: none;' : `border: 1px solid ${theme.colors.grey[0]};`
  )}

  ${({ value }: { value: string }) => value ? 'opacity: 1' : 'opacity: 0.4'};
  border-radius: 3px;

  ${({ isdisabled }: {isdisabled: string}) => isdisabled === 'true' ? `
    cursor: not-allowed;
    user-select: none;
  ` : ''}

  :hover {
    border: 1px solid ${({ theme }: {theme: ITheme}) => theme.colors.yellow[0]};
    opacity: 1;
  };

  :focus {
    border: 1px solid ${({ theme }: {theme: ITheme}) => theme.colors.grey[0]};
    opacity: 1;
    color: ${({ theme }: {theme: ITheme}) => theme.colors.black};
  };

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  -moz-appearance: textfield;
`;

export const InputLabel = styled.div`
  position: relative;
  font-size: 0.8em;
  margin: 0 0 0 0.1em;

  ${({ isRequired, theme }: {isRequired: boolean; theme: ITheme}) => isRequired ? `
    &:after {
      content: ' *';
      color: ${theme.colors.red[0]};
    }
  ` :  ''}
`;

export const ErrorLabel = styled.div`
  position: relative;
  font-size: 0.8em;
  margin: 0.1em 0 0 0.1em;
  color: ${({ theme }: {theme: ITheme}) => theme.colors.red[0]};
  text-align: left;
`;

export const FormInput: React.FC<IFormInputProps> = ({
  className, error, handleChange, height = 39, isBorderless = false, isDisabled = false,
  isRequired = false, label, maskType = 'default', name, placeholder, touched, type, value,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null); // tslint:disable-line no-null-keyword

  React.useEffect(() => {
    if (inputRef.current) {
      // tslint:disable no-unsafe-any
      // @ts-ignore
      const input: HTMLInputElement = inputRef.current.valueOf().inputElement;
      // tslint:enable

      if (!value && !!input.value) {
        input.value = '';
      }
    }
  });

  return (
    <Wrapper
      className={className}
      isDisabled={isDisabled}
    >
      {label && <InputLabel isRequired={isRequired}>{label}</InputLabel>}
      <StyledMaskedInput
        autoComplete="off"
        guide={false}
        isborderless={isBorderless ? 'true' : 'false'}
        isdisabled={isDisabled ? 'true' : 'false'}
        keepCharPositions={false}
        mask={generateMaskFromType(maskType)}
        height={height}
        name={name}
        onChange={(e) => {
          if (maskType === 'default' && e.target) {
            handleChange(e.target.value);
          }
        }}
        pipe={(conformedValue: string, config: IGenericObject): string => {
          if (maskType === 'default') {
            return conformedValue;
          }

          const rawValue = config.rawValue as string;

          // We use the conformedValue to make the raw value since it gets updated first
          let _rawValue = conformedValue;
          let _conformedValue = conformedValue;

          if (rawValue !== value) {
            // Avoids undefined
            _rawValue = _rawValue || '';
            _conformedValue = _conformedValue || '';

            switch (maskType) {
              case 'postalCode': {
                _rawValue = _rawValue.replace(/\s/g, '').toUpperCase();
                _conformedValue = _conformedValue.toUpperCase();
                break;
              }
              case 'phone': {
                _rawValue = _rawValue.replace(/[^\d]/g, '');
                break;
              }
              case 'currency': {
                _rawValue = _rawValue.replace(/[^\d.-]/g, '');
                break;
              }
              case 'text':
              default: {
                // pass
              }
            }

            handleChange(_rawValue);
          }

          return _conformedValue;
        }}
        placeholder={placeholder}
        required={isRequired}
        showMask={false}
        type={type || name}
        value={value ? value : ''}
        // @ts-ignore
        ref={inputRef}
      />
      {touched && error && <ErrorLabel>{error}</ErrorLabel>}
    </Wrapper>
  );
};
