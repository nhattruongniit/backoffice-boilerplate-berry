import { useEffect, useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Tooltip from '@mui/material/Tooltip'

// project imports
import Transitions from '@/components/transition';
import { ThemeMode } from '@/configs';

// assets
import TranslateTwoToneIcon from '@mui/icons-material/TranslateTwoTone';
import { useAppSetting } from '@/contexts/app-setting';

const Localization = () => {
  const abc = "";
  const { mode, borderRadius } = useAppSetting();

  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Box sx={{ ml: { xs: 0, sm: 2 } }}>
        <Tooltip title="Localization" placement="bottom">
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              border: '1px solid',
              borderColor: mode === ThemeMode.DARK ? 'dark.main' : 'primary.light',
              bgcolor: mode === ThemeMode.DARK ? 'dark.main' : 'primary.light',
              color: 'primary.dark',
              transition: 'all .2s ease-in-out',
              '&[aria-controls="menu-list-grow"],&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'primary.main',
                color: 'primary.light',
              },
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            alt="language"
            onClick={handleToggle}
            color="inherit"
          >
            <TranslateTwoToneIcon sx={{ fontSize: '1.3rem' }} />
          </Avatar>
        </Tooltip>
      </Box>
      <Popper
        placement={downMD ? 'bottom-start' : 'bottom'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [downMD ? 0 : 0, 20],
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Transitions position={downMD ? 'top-left' : 'top'} in={open} {...TransitionProps}>
              <Paper elevation={16}>
                {open && (
                  <List
                    sx={{
                      width: '100%',
                      minWidth: 200,
                      maxWidth: { xs: 250, sm: 280 },
                      borderRadius: `${borderRadius}px`,
                    }}
                  >
                    <ListItemButton selected>
                      <ListItemText
                        primary={
                          <Grid container>
                            <Typography color="textPrimary">English</Typography>
                            <Typography variant="caption" color="textSecondary" sx={{ ml: '8px' }}>
                              (UK)
                            </Typography>
                          </Grid>
                        }
                      />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemText
                        primary={
                          <Grid container>
                            <Typography color="textPrimary">中国人</Typography>
                            <Typography variant="caption" color="textSecondary" sx={{ ml: '8px' }}>
                              (Chinese)
                            </Typography>
                          </Grid>
                        }
                      />
                    </ListItemButton>
                  </List>
                )}
              </Paper>
            </Transitions>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
};

export default Localization;
