interface IModalProps {
  footerContent?: JSX.Element;
  handleCloseModal(): void;
  isFullHeight?: boolean;
  isOpen: boolean;
  isUnderneath?: boolean;
  mainContent: JSX.Element;
  title: string | JSX.Element;
}
