import React, { useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { AlertContext } from '../../context';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomAlert = () => {
  const { dataAlert, onCloseAlert } = useContext(AlertContext)
  console.log('data alert: ', dataAlert)
  return (
    <Snackbar className='custom-snackbar' autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center'}} autoHideDuration={6000} open={dataAlert.open} onClose={onCloseAlert}>
      <Alert className="custom-alert" onClose={onCloseAlert} severity={dataAlert.severity}sx={{ width: '80%' }}>
        {dataAlert.message}
      </Alert>
    </Snackbar>
  )
}

export default CustomAlert