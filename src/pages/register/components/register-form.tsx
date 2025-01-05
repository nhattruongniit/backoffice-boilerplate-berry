import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// project imports
import { strengthColor, strengthIndicator } from '@/utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const RegisterForm = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = React.useState(false);

  const [strength, setStrength] = React.useState(0);
  const [level, setLevel] = React.useState<any>();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const changePassword = (value: any) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Sign up with Email address</Typography>
          </Box>
        </Grid>
      </Grid>

      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={{ xs: 0, sm: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              margin="normal"
              name="firstName"
              type="text"
              sx={{ ...theme.typography.customInput }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              margin="normal"
              name="lastName"
              type="text"
              sx={{ ...theme.typography.customInput }}
            />
          </Grid>
        </Grid>
        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
          <OutlinedInput id="outlined-adornment-email-register" type="email" name="email" inputProps={{}} />
        </FormControl>

        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password-register"
            type={showPassword ? 'text' : 'password'}
            name="password"
            label="Password"
            onChange={(e) => {
              changePassword(e.target.value);
            }}
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
          />
        </FormControl>

        {strength !== 0 && (
          <FormControl fullWidth>
            <Box sx={{ mb: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Box sx={{ width: 85, height: 8, borderRadius: '7px', bgcolor: level?.color }} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" fontSize="0.75rem">
                    {level?.label}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </FormControl>
        )}

        <Box sx={{ mt: 2 }}>
          <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
            Sign up
          </Button>
        </Box>
      </form>
    </>
  );
};

export default RegisterForm;
