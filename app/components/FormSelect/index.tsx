import * as React from 'react';
import styled from 'styled-components';

const SelectContainer = styled.div`
  width: 100%;
  margin: 2px 0;
  display: flex;
  flex-direction: column;

  ${({ isDisabled }: {isDisabled: boolean}) => isDisabled ? `
    cursor: not-allowed;
    opacity: 0.6;
    user-select: none;
  ` :  '' }
`;

const Select = styled.select`
  width: 100%;
  height: 39px;
  box-sizing: border-box;
  transition: border .5s ease-in-out;
  transition: border-color .5s ease-in-out;
  transition: opacity .5s ease-in-out;
  outline: none;
  padding: 0 12px;

  ${({ isBorderless, theme }: {isBorderless: boolean; theme: ITheme}) => (
    isBorderless ? 'border: none;' : `border: 1px solid ${theme.colors.grey[0]};`
  )}

  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 3px;

  :hover {
    border: 1px solid ${({ theme }: {theme: ITheme}) => theme.colors.yellow[0]};
    opacity: 1;
  };

  :focus {
    border: 1px solid ${({ theme }: {theme: ITheme}) => theme.colors.grey[0]};
    opacity: 1;
    color: ${({ theme }: {theme: ITheme}) => theme.colors.black};
  };
`;

const Option = styled.option`
  padding: 6px 6px 6px 18px;
  cursor: pointer;
`;

export const SelectLabel = styled.div`
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

export const FormSelect: React.FC<IFormSelectProps> = ({
  className, defaultValue, isBorderless = false, isDisabled = false, isRequired = false, label,
  name, onChange, selectItems,
}) => {
  const [value, setValue] = React.useState('');

  if (defaultValue && !value) {
    setValue(defaultValue);
  }

  return (
    <SelectContainer isDisabled={isDisabled} className={className}>
      {label && (<SelectLabel isRequired={isRequired}>{label}</SelectLabel>)}
      <Select
        value={value}
        name={name}
        isBorderless={isBorderless}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          onChange(e.target.value);
          setValue(e.target.value);
        }}
        required={isRequired}
      >
        {selectItems.map((si: ISelectItem) => (
          <Option
            key={si.key}
            value={si.key}
          >
            {si.value}
          </Option>
        ))}
      </Select>
    </SelectContainer>
  );
};
