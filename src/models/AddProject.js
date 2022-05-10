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
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { creatEmployee, employeeSelector, getEmployees, updateEmployee } from 'src/redux/reducers/employee';
import { clearState, createProject, getProjects, projectSelector, updateProject } from 'src/redux/reducers/projects';
import { creatTask, getTasks, tasksSelector, updateTask } from 'src/redux/reducers/tasks';
import CustomizedSnackbars from 'src/components/CustomizedSnackbars';
import Iconify from 'src/components/Iconify';

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
export default function AddProject({ open, handleClose, data, type }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const [formData, setFormData] = useState({});
  const [assigned_to, setAssigned_to] = useState('');
  const [project, setProject] = useState('');
  const [snakeBarOpen, setSnakeBarOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const { employee } = useSelector(employeeSelector);
  const { successMessage, isSuccess, isError, errorMessage, isFetching } = useSelector(projectSelector);
  const { projects } = useSelector(projectSelector);
  const { title, project_id, site_contact, site_address, description, start_date, status } = formData;
  useEffect(() => {
    dispatch(getProjects(token));
    dispatch(getEmployees(token));
  }, []);

  var employeExloadAdmin = employee.filter((el) => el.role !== 'ADMIN');

  const handleSnackBar = () => {
    setSnakeBarOpen(true);
  };
  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnakeBarOpen(false);
  };

  useEffect(() => {
    setFormData({
      project_id: data ? data?.id : '',
      title: data ? data?.title : '',
      description: data ? data?.description : '',
      site_location: {
        lat: 29.2131,
        lng: -29.12312,
      },
      site_contact: data ? data?.site_contact : '',
      site_address: data ? data?.site_address : '',

      task_id: data ? data?.task_id : '',
    });
  }, [open]);

  const handleProject = (event) => {
    setAssigned_to(event.target.value);
  };
  const handleEmployee = (event) => {
    setProject(event.target.value);
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    formData.token = token;
    formData.user_id = project;

    if (type === 'Edit Project') {
      dispatch(updateProject(formData));
    } else {
      dispatch(createProject(formData));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(getProjects(token));
      dispatch(clearState());
      setMessage(successMessage);
      setSeverity('success');

      handleClose();
      handleSnackBar();
    }
    if (isError) {
      dispatch(clearState());
      handleSnackBar();
      setMessage(errorMessage);
      setSeverity('error');
    }
  }, [isSuccess, isError]);
  return (
    <div style={{ width: '500px' }}>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" classes={{ paper: classes.paper }}>
        <DialogTitle id="form-dialog-title">{type}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="title"
            label="Project Title"
            type="text"
            fullWidth
            className={classes.input}
            value={title}
            onChange={onChange}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            className={classes.input}
            value={description}
            onChange={onChange}
          />
          {type !== 'Edit Project' && (
            <FormControl variant="outlined" className={classes.formControl} fullWidth>
              <InputLabel id="demo-simple-select-outlined-label">Employee</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="project"
                value={project}
                onChange={handleEmployee}
                label="employeeRole"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {employeExloadAdmin.map((emp) => (
                  <MenuItem key={emp.id} value={emp.id}>
                    {emp.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <TextField
            margin="dense"
            id="site_contact"
            label="Site Contact"
            type="text"
            fullWidth
            className={classes.input}
            value={site_contact}
            onChange={onChange}
          />
          <TextField
            margin="dense"
            id="site_address"
            label="Site Address"
            type="text"
            fullWidth
            className={classes.input}
            value={site_address}
            onChange={onChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {type === 'Edit Project' ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
      <CustomizedSnackbars open={snakeBarOpen} message={message} type={severity} reset={handleSnackBarClose} />
    </div>
  );
}
