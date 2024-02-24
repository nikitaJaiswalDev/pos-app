import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SuccessToast = ({ open, handleClose, title}) => {
  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {title}
        </Alert>
    </Snackbar>
  )
}

export default SuccessToast
