import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import { useDispatch, useSelector } from 'react-redux';
import { clearState, loginUser, userSelector } from 'src/redux/reducers/user';
import CustomizedSnackbars from 'src/components/CustomizedSnackbars';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [snakeBarOpen, setSnakeBarOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const handleSnackBar = () => {
    setSnakeBarOpen(true);
  };
  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnakeBarOpen(false);
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    },
  });

  const { isError, isSuccess, errorMessage } = useSelector(userSelector);
  useEffect(() => {
    if (isError) {
      handleSnackBar();
      setMessage(errorMessage);
      setSeverity('error');
    }

    if (isSuccess) {
      navigate('/');
    }

    dispatch(clearState());
  }, [isError, isSuccess, navigate, dispatch]);

  const { errors, touched, values, isSubmitting, getFieldProps } = formik;

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(loginUser(values));
  }
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email address"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
            <FormControlLabel
              control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
              label="Remember me"
            />

            <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
              Forgot password?
            </Link>
          </Stack>

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Login
          </LoadingButton>
        </Form>
      </FormikProvider>
      <CustomizedSnackbars open={snakeBarOpen} message={message} type={severity} reset={handleSnackBarClose} />
    </>
  );
}
