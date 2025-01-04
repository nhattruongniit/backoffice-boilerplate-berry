import { Link as RouterLink } from 'react-router';

// mui
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

// mui icon
import MenuIcon from '@mui/icons-material/Menu';

// config
import { DASHBOARD_PATH, ThemeMode } from '@/configs';

// components
import Logo from '@/components/logo';
import SearchField from './search-field';
import Localization from '@/components/localization';
import Notification from '@/components/notification/notification';
import MobileHambuger from '@/components/mobile-hambuger';
import FullScreen from '@/components/fullscreen';
import Profile from '@/components/profile/profile';
import ThemeModeSection from '@/components/theme-mode';

// context
import { useAppSetting } from '@/contexts/app-setting';

const Header = () => {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));
  const { mode, handlerDrawerOpen } = useAppSetting();

  return (
    <>
      {/* logo & toggler button */}
      <Box sx={{ width: downMD ? 'auto' : 228, display: 'flex' }}>
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
          <Link component={RouterLink} to={DASHBOARD_PATH} aria-label="theme-logo">
            <Logo />
          </Link>
        </Box>
        <Avatar
          variant="rounded"
          sx={{
            ...theme.typography.commonAvatar,
            ...theme.typography.mediumAvatar,
            overflow: 'hidden',
            transition: 'all .2s ease-in-out',
            bgcolor: mode === ThemeMode.DARK ? 'dark.main' : 'secondary.light',
            color: mode === ThemeMode.DARK ? 'secondary.main' : 'secondary.dark',
            '&:hover': {
              bgcolor: mode === ThemeMode.DARK ? 'secondary.main' : 'secondary.dark',
              color: mode === ThemeMode.DARK ? 'secondary.light' : 'secondary.light',
            },
          }}
          onClick={handlerDrawerOpen}
          color="inherit"
        >
          <MenuIcon />
        </Avatar>
      </Box>

      {/* header search */}
      <SearchField />
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      {/* live customization & localization */}
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Localization />
      </Box>

      {/* notification */}
      <Notification />

      {/* full sceen toggler */}
      <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
        <FullScreen />
      </Box>

      {/* theme mode toggler */}
      <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
        <ThemeModeSection />
      </Box>

      {/* profile */}
      <Profile />

      {/* mobile header */}
      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <MobileHambuger />
      </Box>
    </>
  );
};

export default Header;
