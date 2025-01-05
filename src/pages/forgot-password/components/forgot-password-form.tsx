// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

const ForgotPasswordForm = () => {
  const theme = useTheme();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
        <InputLabel htmlFor="outlined-adornment-email-forgot">Email Address / Username</InputLabel>
        <OutlinedInput
          id="outlined-adornment-email-forgot"
          type="email"
          name="email"
          label="Email Address / Username"
          inputProps={{}}
        />
      </FormControl>

      <Box sx={{ mt: 2 }}>
        <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
          Send Mail
        </Button>
      </Box>
    </form>
  );
};

export default ForgotPasswordForm;
