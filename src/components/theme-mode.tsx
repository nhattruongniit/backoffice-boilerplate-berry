// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { ThemeMode } from '@/configs';

// mui icon
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';

// contexts
import { useAppSetting } from '@/contexts/app-setting';

const ThemeModeSection = () => {
  const { mode, onChangeMode } = useAppSetting();
  const theme = useTheme();

  return (
    <Box sx={{ ml: 2 }}>
      <Tooltip title={mode === ThemeMode.DARK ? 'Light Mode' : 'Dark Mode'}>
        <Avatar
          variant="rounded"
          sx={{
            ...theme.typography.commonAvatar,
            ...theme.typography.mediumAvatar,
            border: '1px solid',
            borderColor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'primary.light',
            bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'primary.light',
            color: 'primary.dark',
            transition: 'all .2s ease-in-out',
            '&[aria-controls="menu-list-grow"],&:hover': {
              borderColor: 'primary.main',
              bgcolor: 'primary.main',
              color: 'primary.light',
            },
          }}
          onClick={() => onChangeMode(mode === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK)}
          color="inherit"
        >
          {mode === ThemeMode.DARK ? <LightModeOutlined /> : <DarkModeOutlined />}
        </Avatar>
      </Tooltip>
    </Box>
  );
};

export default ThemeModeSection;
