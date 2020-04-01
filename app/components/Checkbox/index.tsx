import * as React from 'react';
import styled from 'styled-components';

import { FormInput } from 'components/FormInput';

import { formatToSnakeCase } from 'utils/format';

const CheckboxContainer = styled.div`
  -webkit-transition: all .3s ease-in-out;
  transition: all .3s ease-in-out;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;

  :hover + label:after, &>label:hover:after  {
    opacity: .5;
  }

  :hover + label:before, &>label:hover:before {
    opacity: .5;
    border: 2px solid ${({ theme }: {theme: ITheme}) => theme.colors.yellow[0]};
  }
`;

const CheckboxInput = styled.input`
  display: none;
  -webkit-transition: all .3s ease-in-out;
  transition: all .3s ease-in-out;
  cursor: pointer;

  :checked + label:after {
    background-color: ${({ theme }: {theme: ITheme}) => theme.colors.blue[0]};
  }
`;

const CheckboxLabel = styled.label`
  display: block;
  position: relative;
  padding-left: 34px; /* 12px padding plus 22px for the box */
  margin-bottom: 12px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-transition: all .3s ease-in-out;
  transition: all .3s ease-in-out;
  top: 4px;

  :before {
    content: '';
    display: block;
    width: 16px;
    height: 16px;
    border: 2px solid ${({ theme }: {theme: ITheme}) => theme.colors.grey[3]};
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 0;
  }

  :after {
    content: '';
    display: block;
    width: 12px;
    height: 12px;
    border: none;
    border-radius: 50%;
    background-color: unset;
    position: absolute;
    left: 4px;
    top: 4px;
  }

  &.checked:after {
    background-color: ${({ theme }: {theme: ITheme}) => theme.colors.blue[0]};
  }
`;

const StyledFormInput = styled(FormInput)`
  margin: 0;
  width: 100%;
`;

export const Checkbox: React.FC<ICheckboxProps> = ({
  checked, className, handleChange, isBorderless = false, isEditable = false, label, maskType,
}) => {
  const [isChecked, setIsChecked] = React.useState(!!checked);
  const [inputValue, setInputValue] = React.useState(label);

  const id = formatToSnakeCase(label);

  if (checked !== undefined && checked !== isChecked) {
    setIsChecked(checked);
  }

  return (
    isEditable ? (
      <CheckboxContainer className={className}>
        <CheckboxLabel htmlFor={id} className={isChecked ? 'checked' : ''}>
          <CheckboxInput
            id={id}
            type="checkbox"
            checked={isChecked}
            onChange={() => {
              const _isChecked = !isChecked;
              setIsChecked(_isChecked);
              handleChange(_isChecked, inputValue);
            }}
          />
        </CheckboxLabel>
        <StyledFormInput
          name={label}
          height={30}
          isBorderless={isBorderless}
          value={inputValue}
          maskType={maskType}
          handleChange={(value) => {
            setInputValue(value);
            handleChange(isChecked, value);
          }}
        />
      </CheckboxContainer>
    ) : (
      <CheckboxContainer className={className}>
        <CheckboxInput
          id={id}
          type="checkbox"
          checked={isChecked}
          onChange={() => {
            const _isChecked = !isChecked;
            setIsChecked(_isChecked);
            handleChange(_isChecked, inputValue);
          }}
        />
        <CheckboxLabel htmlFor={id}>{label}</CheckboxLabel>
      </CheckboxContainer>
    )
  );
};
