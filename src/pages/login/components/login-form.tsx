import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '@refinedev/react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { PATH_NAME } from '@/configs/path-name';
import FormHelperText from '@mui/material/FormHelperText/FormHelperText';
import { useLogin } from '@refinedev/core';

const validationSchema: any = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().required('Password is required'),
  confirm_password: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), ''], 'Passwords must match'),
});

const LoginForm = () => {
  const theme = useTheme();
  const { mutate: login } = useLogin<any>();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm_password: '',
    },
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
    // window.localStorage.setItem('access_token', 'dasdasdsa');
    // window.location.href = PATH_NAME.ROOT;
    login({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth sx={{ ...theme.typography.customInput }} error={Boolean(touchedFields.email && errors.email)}>
        <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
        <OutlinedInput
          id="outlined-adornment-email-login"
          type="email"
          inputProps={{}}
          {...register('email')}
          error={!!errors.email}
        />
        {touchedFields.email && errors.email && (
          <FormHelperText error id="standard-weight-helper-text-email-login">
            {errors.email.message}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl fullWidth sx={{ ...theme.typography.customInput }} error={Boolean(touchedFields.password && errors.password)}>
        <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password-login"
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
          error={!!errors.password}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                size="large"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          inputProps={{}}
          label="Password"
        />
        {touchedFields.password && errors.password && (
          <FormHelperText error id="standard-weight-helper-text-email-login">
            {errors.password.message}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl
        fullWidth
        sx={{ ...theme.typography.customInput }}
        error={Boolean(touchedFields.confirm_password && errors.confirm_password)}
      >
        <InputLabel htmlFor="outlined-adornment-password-login">Confirm Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password-login"
          type={showPassword ? 'text' : 'password'}
          {...register('confirm_password')}
          error={!!errors.confirm_password}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                size="large"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          inputProps={{}}
          label="Password"
        />
        {touchedFields.confirm_password && errors.confirm_password && (
          <FormHelperText error id="standard-weight-helper-text-email-login">
            {errors.confirm_password.message}
          </FormHelperText>
        )}
      </FormControl>

      <Box sx={{ textAlign: 'right' }}>
        <Typography
          variant="subtitle1"
          component={Link}
          to={PATH_NAME.FORGOT_PASSWORD}
          color="secondary"
          sx={{ textDecoration: 'none' }}
        >
          Forgot Password?
        </Typography>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Button color="secondary" fullWidth size="large" type="submit" variant="contained">
          Sign In
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;
