import * as React from 'react';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

export default function CustomizedSnackbars({ open, message, type, reset }) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    reset();
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
