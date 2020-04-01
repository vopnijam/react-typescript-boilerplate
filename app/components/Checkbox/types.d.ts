interface ICheckboxProps {
  checked?: boolean;
  className?: string;
  handleChange(checked: boolean, inputValue: string): void;
  isBorderless?: boolean;
  isEditable?: boolean;
  label: string;
  maskType?: FormInputMaskType;
}
