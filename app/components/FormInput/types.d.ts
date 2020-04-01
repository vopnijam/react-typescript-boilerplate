type FormInputMaskType = 'postalCode' | 'phone' | 'currency' | 'text' | 'default';

interface IFormInputProps {
  className?: string;
  error?: string;
  handleChange(value: string): void;
  id?: string;
  isBorderless?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  height?: number;
  label?: string;
  maskType?: FormInputMaskType;
  name: string;
  placeholder?: string;
  touched?: boolean;
  type?: string;
  value?: string;
}
