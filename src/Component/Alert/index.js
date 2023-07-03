import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomAlert = ({
  severity,
  message,
  open,
  onClose
}) => {
  return (
    <Snackbar className='custom-snackbar' anchorOrigin={{ vertical: 'top', horizontal: 'center'}} autoHideDuration={6000} open={open} onClose={onClose}>
      <Alert className="custom-alert" onClose={onClose} severity={severity}sx={{ width: '80%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default CustomAlert