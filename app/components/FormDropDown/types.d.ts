interface IDropDownItem {
  fill?: string;
  key: string;
  onClick?(): void;
  path?: string;
  value: string;
}

interface IFormDropDownProps {
  className?: string;
  dropDownItems: IDropDownItem[];
  isBorderless?: boolean;
  isDisabled: boolean;
  isRequired?: boolean;
  label?: string;
  onChange(item: string): void;
}

interface IFormDropDownState {
  selectedItem: IDropDownItem;
  isMenuOpen: boolean;
}
