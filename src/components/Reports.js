import { Box, Divider, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pdf from 'react-to-pdf';
import { removeHypen } from 'src/helpers/helper';
import { getReports, reportsSelector } from 'src/redux/reducers/reports';
import Iconify from './Iconify';

const ref = React.createRef();

const useStyles = makeStyles(() => ({
  date: {
    marginLeft: 20,
  },
  pdf: {
    paddingTop: '30px',
    paddingLeft: '10px',
  },
  pdfBtn: {
    color: '#1565c0',
    position: 'absolute',
    top: 10,
    right: 20,
  },
  hr: {
    background: 'gray',
    border: 'none',
    height: '1px',
    width: '100%',
  },
}));

const Reports = ({ data }) => {
  console.log('data', data);
  const dispatch = useDispatch();
  const { reports } = useSelector(reportsSelector);

  console.log('reports', reports);
  const classes = useStyles();

  const [report, setReport] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const token = localStorage.getItem('token');
  const id = data.user_id;

  useEffect(async () => {
    const data = { id, token, startDate, endDate };
    await dispatch(getReports(data));
    setReport(reports?.user);
  }, [startDate, endDate]);

  return (
    <>
      <Pdf targetRef={ref} filename="doc.pdf">
        {({ toPdf }) => (
          <Tooltip title="download pdf" placement="left">
            <IconButton className={classes.pdfBtn} onClick={toPdf}>
              <Iconify icon="akar-icons:cloud-download" width={30} height={30} />
            </IconButton>
          </Tooltip>
        )}
      </Pdf>
      <TextField
        style={{ paddingLeft: '40px' }}
        id="outlined-basic"
        variant="outlined"
        helperText="Start date"
        type="date"
        value={startDate}
        onChange={(e) => {
          setStartDate(e.target.value);
        }}
      />

      <TextField
        className={classes.date}
        id="outlined-basic"
        variant="outlined"
        helperText="End date"
        type="date"
        value={endDate}
        onChange={(e) => {
          setEndDate(e.target.value);
        }}
      />
      <Box sx={{ width: '400px' }} ref={ref} className={classes.pdf}>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <Typography variant="h6" gutterBottom>
              User Details
            </Typography>
            <Divider />
            <hr className={classes.hr}></hr>
            <Grid container>
              <Grid item sm={12} md={6}>
                <Typography variant="overline">Name</Typography>
              </Grid>
              <Grid item sm={12} md={6}>
                <Grid item sm={12} md={6}>
                  <Typography variant="caption">{reports?.USER?.name}</Typography>
                </Grid>
              </Grid>
              <Grid item sm={12} md={6}>
                <Typography variant="overline">Email</Typography>
              </Grid>
              <Grid item sm={12} md={6}>
                <Typography variant="caption">{reports?.USER?.email}</Typography>
              </Grid>
              <Grid item sm={12} md={6}>
                <Typography variant="overline">Role</Typography>
              </Grid>
              <Grid item sm={12} md={6}>
                <Typography variant="caption">{removeHypen(reports?.USER?.role)}</Typography>
              </Grid>
              <Grid item sm={12} md={6}>
                <Typography variant="overline">Contact</Typography>
              </Grid>
              <Grid item sm={12} md={6}>
                <Typography variant="caption">{reports?.USER?.contact}</Typography>
              </Grid>
            </Grid>
            <hr className={classes.hr}></hr>
          </Grid>
          <Grid item md={12}>
            <Typography variant="h6" gutterBottom>
              Report
            </Typography>
            <hr className={classes.hr}></hr>
            <Grid container>
              <Grid item sm={12} md={6}>
                <Typography variant="overline">Travel Time</Typography>
              </Grid>
              <Grid item sm={12} md={6}>
                <Typography variant="caption">
                  {' '}
                  {reports?.TRAVEL_TIME?.HOURS}h {reports?.TRAVEL_TIME?.MINUTES}m {reports?.TRAVEL_TIME?.SECONDS}s
                </Typography>
              </Grid>
              <Grid item sm={12} md={6}>
                <Typography variant="overline">Working_Time</Typography>
              </Grid>
              <Grid item sm={12} md={6}>
                <Typography variant="caption">
                  {reports?.WORKING_TIME?.HOURS}h {reports?.WORKING_TIME?.MINUTES}m {reports?.WORKING_TIME?.SECONDS}s
                </Typography>
              </Grid>
              <Grid item sm={12} md={6}>
                <Typography variant="overline">Pending Tasks</Typography>
              </Grid>
              <Grid item sm={12} md={6}>
                <Typography variant="caption">{reports?.PENDING_TASKS}</Typography>
              </Grid>
              <Grid item sm={12} md={6}>
                <Typography variant="overline">Complated Tasks</Typography>
              </Grid>
              <Grid item sm={12} md={6}>
                <Typography variant="caption">{reports?.COUNT} </Typography>
              </Grid>
            </Grid>
            <hr className={classes.hr}></hr>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Reports;
