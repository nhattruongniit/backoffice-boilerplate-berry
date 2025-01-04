// material-ui
import { styled, Theme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';

// project import
import { ThemeMode, drawerWidth } from '@/configs';

const openedMixin = (theme: Theme) => ({
    width: drawerWidth,
    borderRight: 'none',
    zIndex: 1099,
    background: theme.palette.background.default,
    overflowX: 'hidden',
    boxShadow: theme.palette.mode === ThemeMode.DARK ? theme.customShadows.z1 : 'none',
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen + 200
    })
});

const closedMixin = (theme: Theme) => ({
    borderRight: 'none',
    zIndex: 1099,
    background: theme.palette.background.default,
    overflowX: 'hidden',
    width: 72,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen + 200
    })
});

const MiniDrawerStyled = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }: any) => ({
    width: drawerWidth,
    borderRight: '0px',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme)
    })
}));

export default MiniDrawerStyled;
