import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const CustomToast = ({ open, handleClose, title, type}) => {
  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={type}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {title}
        </Alert>
    </Snackbar>
  )
}

export default CustomToast
