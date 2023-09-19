export type SnackbarType = {
  isOpen: boolean;
  message: string;
  severity: 'error' | 'warning' | 'info' | 'success';
};
