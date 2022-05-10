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
import { creatEmployee, employeeSelector, getEmployees, updateEmployee } from 'src/redux/reducers/employee';
import { getProjects, projectSelector } from 'src/redux/reducers/projects';
import { clearState, creatTask, getTasks, tasksSelector, updateTask } from 'src/redux/reducers/tasks';
import CustomizedSnackbars from 'src/components/CustomizedSnackbars';
import { useNavigate } from 'react-router-dom';

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
export default function AddTask({ open, handleClose, data, type }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [formData, setFormData] = useState({});
  const [assigned_to, setAssigned_to] = useState('');
  const [project, setProject] = useState('');
  const [snakeBarOpen, setSnakeBarOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const { employee } = useSelector(employeeSelector);
  const { successMessage, isSuccess, isError, errorMessage, isFetching } = useSelector(tasksSelector);
  const { projects } = useSelector(projectSelector);
  const { title, project_id, description, start_date, status, task_id } = formData;
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
      title: data ? data?.task_title : '',
      project_id: '',
      description: data ? data?.task_description : '',
      start_date: data ? data?.start_date : '',
      status: 'PENDING',
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
    formData.assigned_to = project;
    formData.project_id = assigned_to;

    if (type === 'Edit Task') {
      dispatch(updateTask(formData));
    } else {
      dispatch(creatTask(formData));
    }
    dispatch(getTasks(token));
  };
  console.log('issucess', isSuccess);
  useEffect(() => {
    if (isSuccess) {
      dispatch(getTasks(token));
      dispatch(clearState());
      setMessage(successMessage);
      setSeverity('success');

      handleClose();
      handleSnackBar();
    }
    if (isError) {
      if (errorMessage === 'jwt session expired,Please login again') {
        alert('session expired,Please login again');
        localStorage.clear();
        navigate('/login');
      }
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
            label="Task Title"
            type="text"
            fullWidth
            className={classes.input}
            value={title}
            onChange={onChange}
          />
          <TextField
            margin="dense"
            id="description"
            label="Task Description"
            type="text"
            fullWidth
            className={classes.input}
            value={description}
            onChange={onChange}
          />
          <TextField
            margin="dense"
            placeholder="Select date and time"
            type="date"
            id="start_date"
            value={start_date}
            onChange={onChange}
            fullWidth
            className={classes.input}
          />

          {type !== 'Edit Task' && (
            <>
              <FormControl variant="outlined" className={classes.formControl} fullWidth>
                <InputLabel id="assigned_to">Projects</InputLabel>
                <Select
                  labelId="assigned_to"
                  id="assigned_to"
                  value={assigned_to}
                  onChange={handleProject}
                  label="employeeRole"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {projects.map((project) => (
                    <MenuItem key={project.id} value={project.id}>
                      {project.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

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
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {type === 'Edit Task' ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
      <CustomizedSnackbars open={snakeBarOpen} message={message} type={severity} reset={handleSnackBarClose} />
    </div>
  );
}
