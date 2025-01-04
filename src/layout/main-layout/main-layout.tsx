import React from 'react'

// mui
import { alpha, styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useAppSetting } from '@/contexts/app-setting';
import { MenuOrientation } from '@/configs';

import Header from './components/header';
import Sidebar from './components/sidebar';

import MainContentStyled from './styled/main-content-styled';

interface MainLayoutProps extends React.PropsWithChildren {}


function MainLayout({ children }: MainLayoutProps) {
  const { palette, transitions, breakpoints } = useTheme();
  const downMD = useMediaQuery(breakpoints.down('md'));

  const { container, borderRadius, miniDrawer, menuOrientation, drawerOpen, handlerDrawerOpen } = useAppSetting();

  React.useEffect(() => {
    handlerDrawerOpen();
  }, [miniDrawer]);

  React.useEffect(() => {
      downMD && handlerDrawerOpen();
  }, [downMD]);

  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downMD;

  return (
    <>
      <Box sx={{ display: 'flex' }}>
          {/* header */}
          <AppBar enableColorOnDark position="fixed" color="inherit" elevation={0} sx={{ bgcolor: 'background.default' }}>
            <Toolbar sx={{ p: isHorizontal ? 1.25 : 2 }}>
              <Header />
            </Toolbar>
          </AppBar>

          {/* menu / drawer */}
          <Sidebar />

          {/* main content */}
          <MainContentStyled  {...{ borderRadius, menuOrientation, open: drawerOpen, palette, transitions, breakpoints }}>
            <Container maxWidth={container ? 'lg' : false} {...(!container && { sx: { px: { xs: 0 } } })}>
              {children}
            </Container>
          </MainContentStyled>
      </Box>
    </>
  )
}

export default MainLayout