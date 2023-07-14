import { createContext } from 'react';

export const AlertContext = createContext({
  onClose: () => {},
  setDataAlert: () => {},
  dataAlert: {
    severity: 'warning',
    message: '',
    open: false,
  }
})