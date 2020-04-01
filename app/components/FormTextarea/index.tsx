import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 1em;

  ${({ isDisabled }: {isDisabled: boolean}) => isDisabled ? `
    cursor: not-allowed;
    opacity: 0.6;
    user-select: none;
  ` :  '' }
`;

const StyledTextarea = styled.textarea<{
  isBorderless: boolean; isDisabled: string; value: string;
}>`
  width: 100%;
  box-sizing: border-box;

  resize: vertical;
  min-height: 40px;

  transition: border .5s ease-in-out;
  transition: border-color .5s ease-in-out;
  transition: opacity .5s ease-in-out;
  outline: none;
  padding: 12px;

  ${({ isBorderless, theme }: {isBorderless: boolean; theme: ITheme}) => (
    isBorderless ? 'border: none;' : `border: 1px solid ${theme.colors.grey[0]};`
  )}

  ${({ value }: { value: string }) => value ? 'opacity: 1' : 'opacity: 0.4'};
  border-radius: 3px;

  ${({ isDisabled }) => isDisabled === 'true' ? `
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
`;

export const Label = styled.div`
  position: relative;
  font-size: 0.8em;
  margin: 0 0 0 0.1em;

  ${({ isRequired }: {isRequired: boolean}) => isRequired ? `
    &:after {
      content: ' *';
      color: ${({ theme }: {theme: ITheme}) => theme.colors.red[0]};
    }
  ` :  ''}
`;

const ErrorLabel = styled.div`
  position: relative;
  font-size: 0.8em;
  margin: 0.1em 0 0 0.1em;
  color: ${({ theme }: {theme: ITheme}) => theme.colors.red[0]};
`;

export const FormTextarea: React.FC<IFormTextareaProps> = ({
  className, error, handleChange, isBorderless = false, isDisabled = false, isRequired = false,
  label, name, onKeyDown, placeholder, rows = 2, touched, value,
}) => {
  // tslint:disable-next-line no-null-keyword
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (textAreaRef.current) {
      // @ts-ignore
      const textArea: HTMLTextAreaElement = textAreaRef.current.valueOf();

      if (!value && !!textArea.value) {
        textArea.value = '';
      }
    }
  });

  return (
    <Wrapper isDisabled={isDisabled} className={className}>
      {label && <Label isRequired={isRequired}>{label}</Label>}

      <StyledTextarea
        autoComplete="off"
        isBorderless={isBorderless}
        isDisabled={isDisabled ? 'true' : 'false'}
        name={name}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        placeholder={placeholder}
        required={isRequired}
        rows={rows}
        onKeyDown={onKeyDown}
        value={value ? value : ''}
        // @ts-ignore
        ref={textAreaRef}
      />
      {touched && error && <ErrorLabel>{error}</ErrorLabel>}
    </Wrapper>
  );
};
