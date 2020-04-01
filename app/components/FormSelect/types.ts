interface ISelectItem {
  icon?: JSX.Element;
  key: string;
  value: string;
  onClick?(): void;
}

interface IFormSelectProps {
  onChange(item: string): void;
  isBorderless?: boolean;
  isDisabled: boolean;
  name: string;
  label?: string;
  isRequired?: boolean;
  className?: string;
  defaultValue?: string;
  selectItems: ISelectItem[];
}
