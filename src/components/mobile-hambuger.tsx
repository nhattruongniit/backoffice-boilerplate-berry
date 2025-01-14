import { useEffect, useRef, useState } from 'react';

// material-ui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Toolbar from '@mui/material/Toolbar';

// mui icon
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Localization from '@/components/localization';
import Transitions from '@/components/transition';

// ==============================|| MOBILE HEADER ||============================== //

const MobileHambuger = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent | null) => {
    if (anchorRef.current && event?.target instanceof Node && anchorRef.current.contains(event.target)) {
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
      <Box component="span" ref={anchorRef} sx={{ mt: 1, ml: 1 }}>
        <IconButton sx={{ color: 'text.primary', ml: 0.5, cursor: 'pointer' }} onClick={handleToggle}>
          <MoreVertIcon />
        </IconButton>
      </Box>

      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        style={{ width: '100%', zIndex: 1 }}
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 30],
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Transitions type="zoom" in={open} {...TransitionProps} sx={{ transformOrigin: 'top right' }}>
              <Paper>
                {open && (
                  <AppBar color="inherit">
                    <Toolbar sx={{ py: 2.75 }}>
                      <Localization />
                    </Toolbar>
                  </AppBar>
                )}
              </Paper>
            </Transitions>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
};

export default MobileHambuger;
