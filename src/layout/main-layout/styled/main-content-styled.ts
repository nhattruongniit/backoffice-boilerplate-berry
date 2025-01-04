// material-ui
import { styled } from '@mui/material/styles';

import { drawerWidth, MenuOrientation, ThemeMode } from '@/configs';

interface MainContentStyledProps {
  borderRadius: number;
  menuOrientation: string;
  open: boolean;
}

const MainContentStyled = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'borderRadius' && prop !== 'menuOrientation',
})<MainContentStyledProps>(({ palette, transitions, breakpoints, open, menuOrientation, borderRadius }: any) => ({
  backgroundColor: palette.mode === ThemeMode.DARK ? palette.dark[800] : palette.grey[100],
  minWidth: '1%',
  width: '100%',
  minHeight: 'calc(100vh - 88px)',
  flexGrow: 1,
  padding: 20,
  marginTop: 88,
  marginRight: 20,
  borderRadius: `${borderRadius}px`,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  ...(!open && {
    transition: transitions.create('margin', {
      easing: transitions.easing.sharp,
      duration: transitions.duration.shorter + 200,
    }),
    [breakpoints.up('md')]: {
      marginLeft: menuOrientation === MenuOrientation.VERTICAL ? -(drawerWidth - 72) : 20,
      width: `calc(100% - ${drawerWidth}px)`,
      marginTop: menuOrientation === MenuOrientation.HORIZONTAL ? 135 : 88,
    },
  }),
  ...(open && {
    transition: transitions.create('margin', {
      easing: transitions.easing.easeOut,
      duration: transitions.duration.shorter + 200,
    }),
    marginLeft: menuOrientation === MenuOrientation.HORIZONTAL ? 20 : 0,
    marginTop: menuOrientation === MenuOrientation.HORIZONTAL ? 135 : 88,
    width: `calc(100% - ${drawerWidth}px)`,
    [breakpoints.up('md')]: {
      marginTop: menuOrientation === MenuOrientation.HORIZONTAL ? 135 : 88,
    },
  }),
  [breakpoints.down('md')]: {
    marginLeft: 20,
    padding: 16,
    marginTop: 88,
    ...(!open && {
      width: `calc(100% - ${drawerWidth}px)`,
    }),
  },
  [breakpoints.down('sm')]: {
    marginLeft: 10,
    marginRight: 10,
  },
}));

export default MainContentStyled;
