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

const CreateUser = ({ onChange, data, employeeRole, handleChange }) => {
  const classes = useStyles();
  const { name, email, password, role, contact, user_id } = data;
  return (
    <>
      <TextField
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
      />
    </>
  );
};

export default CreateUser;
