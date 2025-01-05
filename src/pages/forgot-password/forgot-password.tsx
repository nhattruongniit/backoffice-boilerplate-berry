import { Link } from 'react-router-dom';

// material-ui
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import MainCard from '@/components/card/main-card';
import Logo from '@/components/logo';
import ForgotPasswordForm from './components/forgot-password-form';

// styles
import AuthWrapperStyled from '@/components/auth-form/auth-wrapper-styled';
import { PATH_NAME } from '@/configs/path-name';

const ForgotPassword = () => {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <AuthWrapperStyled>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <MainCard
                sx={{
                  maxWidth: { xs: 400, lg: 475 },
                  margin: { xs: 2.5, md: 3 },
                  '& > *': {
                    flexGrow: 1,
                    flexBasis: '50%',
                  },
                }}
              >
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item sx={{ mb: 3 }}>
                    <Link to="#" aria-label="theme logo">
                      <Logo />
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="center" textAlign="center" spacing={2}>
                      <Grid item xs={12}>
                        <Typography color="secondary.main" gutterBottom variant={downMD ? 'h3' : 'h2'}>
                          Forgot password?
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="caption" fontSize="16px" textAlign="center">
                          Enter your email address below and we&apos;ll send you password reset OTP.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <ForgotPasswordForm />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item container direction="column" alignItems="center" xs={12}>
                      <Typography component={Link} to={PATH_NAME.LOGIN} variant="subtitle1" sx={{ textDecoration: 'none' }}>
                        Already have an account?
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapperStyled>
  );
};

export default ForgotPassword;
