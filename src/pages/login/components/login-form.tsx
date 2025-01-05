import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { PATH_NAME } from '@/configs/path-name';

const LoginForm = () => {
  const theme = useTheme();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.localStorage.setItem('access_token', 'dasdasdsa');
    window.location.href = PATH_NAME.ROOT;
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
        <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
        <OutlinedInput id="outlined-adornment-email-login" type="email" name="email" inputProps={{}} />
      </FormControl>

      <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
        <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password-login"
          type={showPassword ? 'text' : 'password'}
          name="password"
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
