import { Link } from 'react-router-dom';

// material-ui
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

// components
import LoginForm from './components/login-form';
import MainCard from '@/components/card/main-card';
import Logo from '@/components/logo';
import AuthWrapperStyled from '@/components/auth-form/auth-wrapper-styled';

import { PATH_NAME } from '@/configs/path-name';

const Login = () => {
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
                <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>
                  <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item sx={{ mb: 3 }}>
                      <Link to="#" aria-label="logo">
                        <Logo />
                      </Link>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container direction={{ xs: 'column-reverse', md: 'row' }} alignItems="center" justifyContent="center">
                        <Grid item>
                          <Stack alignItems="center" justifyContent="center" spacing={1}>
                            <Typography color="secondary.main" gutterBottom variant={downMD ? 'h3' : 'h2'}>
                              Hi, Welcome Back
                            </Typography>
                            <Typography variant="caption" fontSize="16px" textAlign={{ xs: 'center', md: 'inherit' }}>
                              Enter your credentials to continue
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <LoginForm />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid item container direction="column" alignItems="center" xs={12}>
                        <Typography component={Link} to={PATH_NAME.REGISTER} variant="subtitle1" sx={{ textDecoration: 'none' }}>
                          Don&apos;t have an account?
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapperStyled>
  );
};

export default Login;
