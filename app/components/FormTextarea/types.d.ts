interface IFormTextareaProps {
  className?: string;
  error?: string;
  handleChange(value: string): void;
  isBorderless?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  label?: string;
  name: string;
  // @ts-ignore
  onKeyDown?(e: KeyboardEvent<HTMLTextAreaElement>): void;
  placeholder?: string;
  rows?: number;
  touched?: boolean;
  value?: string;
}
