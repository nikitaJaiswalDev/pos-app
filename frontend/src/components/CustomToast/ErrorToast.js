import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const ErrorToast = ({ open, handleClose, title}) => {
  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {title}
        </Alert>
    </Snackbar>
  )
}

export default ErrorToast
