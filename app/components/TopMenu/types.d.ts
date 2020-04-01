interface ITopMenuProps {
  isApiLoading: boolean;
  notifications: INotification[];
  onClick?: void;
  theme: ITheme;
  title: string;
  handleChangePage(page: string): void;
  handleDeleteNotification(notification: INotification): void;
  handlePatchNotification(notification: INotification): void;
}

interface ITopMenuState {
  isMenuOpen: boolean;
}
