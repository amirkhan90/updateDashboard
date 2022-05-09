import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  changePassword,
  changeRole,
  clearState,
  creatEmployee,
  employeeSelector,
  getEmployees,
  updateEmployee,
} from 'src/redux/reducers/employee';
import CreateUser from 'src/components/CreateUser';
import EditUser from 'src/components/EditUser';
import EditRole from 'src/components/EditRole';
import ChangePassword from 'src/components/ChangePassword';
import { Report } from '@material-ui/icons';
import Reports from 'src/components/Reports';
import Iconify from 'src/components/Iconify';

import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    marginBottom: '8px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  input: { marginBottom: '16px' },
  paper: { minWidth: '500px' },
}));
export default function AddEmployee({ open, handleClose, data, type }) {
  console.log('type', type);
  const classes = useStyles();
  const dispatch = useDispatch();

  const [snakeBarOpen, setSnakeBarOpen] = useState(false);

  const token = localStorage.getItem('token');
  const [formData, setFormData] = useState({});
  const [employeeRole, setEmployeeRole] = useState('');

  const { successMessage, isSuccess, isError, errorMessage, isFetching } = useSelector(employeeSelector);
  useEffect(() => {
    setFormData({
      name: data ? data.name : '',
      email: data ? data.email : '',
      contact: data ? data.contact : '',
      user_id: data ? data.id : '',
    });
    setEmployeeRole(data ? data.role : '');
  }, [open]);

  const handleChange = (event) => {
    setEmployeeRole(event.target.value);
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleSnackBar = () => {
    setSnakeBarOpen(true);
  };
  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnakeBarOpen(false);
  };
  const action = (
    <React.Fragment>
      {/* <Button color="secondary" size="small" onClick={handleSnackBarClose}>
        UNDO
      </Button> */}
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackBarClose}>
        <Iconify icon="clarity:window-close-line" width={24} height={24} />
      </IconButton>
    </React.Fragment>
  );

  let heading;
  console.log('add employee type', type);

  const handleSubmit = async () => {
    formData.role = employeeRole;
    formData.token = token;

    switch (type) {
      case 'user':
        heading = 'Edit Employee';
        return dispatch(updateEmployee(formData));
      case 'Change Role':
        return dispatch(changeRole(formData));
      case 'Change Password':
        return dispatch(changePassword(formData));
      default:
        return dispatch(creatEmployee(formData));
    }
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(getEmployees(token));
      console.log('useEffect is called');
      dispatch(clearState());
      handleClose();
      handleSnackBar();
    }
    if (isError) {
      dispatch(clearState());
    }
  }, [isSuccess, isError]);
  const { name, email, password, role, contact, user_id } = formData;

  return (
    <div style={{ width: '500px' }}>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" classes={{ paper: classes.paper }}>
        <DialogTitle id="form-dialog-title">{type === 'user' ? 'Edit User' : type}</DialogTitle>
        <DialogContent>
          {type === 'add employee' && (
            <CreateUser onChange={onChange} data={formData} handleChange={handleChange} employeeRole={employeeRole} />
          )}
          {type === 'user' && (
            <EditUser onChange={onChange} data={formData} handleChange={handleChange} employeeRole={employeeRole} />
          )}
          {type === 'Change Role' && (
            <EditRole onChange={onChange} data={formData} handleChange={handleChange} employeeRole={employeeRole} />
          )}
          {type === 'Change Password' && (
            <ChangePassword
              onChange={onChange}
              data={formData}
              handleChange={handleChange}
              employeeRole={employeeRole}
            />
          )}
          {type === 'View Reports' && (
            <Reports onChange={onChange} data={formData} handleChange={handleChange} employeeRole={employeeRole} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {type !== 'View Reports' && (
            <Button onClick={handleSubmit} color="primary">
              {type === 'user' ? 'Update' : 'Create'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snakeBarOpen}
        autoHideDuration={3000}
        onClose={handleSnackBarClose}
        message={successMessage}
        severity="success"
        action={action}
      >
        <Alert severity="success">{successMessage}</Alert>
      </Snackbar>
    </div>
  );
}
