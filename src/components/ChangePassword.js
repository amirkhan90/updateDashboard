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
import { clearState, creatEmployee, employeeSelector, getEmployees, updateEmployee } from 'src/redux/reducers/employee';

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

const ChangePassword = ({ onChange, data, employeeRole, handleChange }) => {
  const classes = useStyles();
  const { name, email, password, role, contact, user_id } = data;
  return (
    <>
      <TextField
        margin="dense"
        id="password"
        label="Password"
        type="text"
        fullWidth
        className={classes.input}
        value={password}
        onChange={onChange}
      />
    </>
  );
};

export default ChangePassword;
