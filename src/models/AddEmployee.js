import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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

    console.log('heading', heading);
    // if (type === 'edit employee') {
    //   dispatch(updateEmployee(formData));
    // } else {
    //   dispatch(creatEmployee(formData));
    // }
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(getEmployees(token));
      console.log('useEffect is called');
      dispatch(clearState());
      handleClose();
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

          {/* <TextField
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            className={classes.input}
            value={name}
            onChange={onChange}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            className={classes.input}
            value={email}
            onChange={onChange}
          />{' '}
        <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            className={classes.input}
            value={password}
            onChange={onChange}
          />
          <FormControl variant="outlined" className={classes.formControl} fullWidth>
            <InputLabel id="demo-simple-select-outlined-label">employee</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={employeeRole}
              onChange={handleChange}
              label="employeeRole"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="PROJECT_MANAGER">PROJECT MANAGER</MenuItem>
              <MenuItem value="FIELD_INSPECTOR">FIELD INSPECTOR</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            id="contact"
            label="Contact"
            type="text"
            fullWidth
            value={contact}
            onChange={onChange}
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {type === 'edit employee' ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
