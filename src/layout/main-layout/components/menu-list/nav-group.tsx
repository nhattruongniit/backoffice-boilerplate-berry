import { Fragment, useEffect, useState } from 'react';
import { matchPath, useLocation } from 'react-router';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// mui icon
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import RemoveIcon from '@mui/icons-material/Remove';

// project imports
import NavCollapse from './nav-collapse';
import NavItem from './nav-item';

import Transitions from '@/components/transition';
import { MenuOrientation } from '@/configs';
import { useAppSetting } from '@/contexts/app-setting';

interface NavGroupProps {
  selectedID?: string;
  setSelectedID: (id: string) => void;
  item?: any;
  lastItem: number | null;
  remItems: any[];
  lastItemId?: string;
  parentId?: string;
}

const NavGroup = ({ item, lastItem, remItems, lastItemId, selectedID, setSelectedID }: NavGroupProps) => {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));
  const { pathname } = useLocation();

  const { menuOrientation, borderRadius, drawerOpen } = useAppSetting();
  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downMD;

  const [anchorEl, setAnchorEl] = useState(null);
  const [currentItem, setCurrentItem] = useState(item);

  const openMini = Boolean(anchorEl);

  useEffect(() => {
    if (lastItem) {
      if (item.id === lastItemId) {
        const localItem = { ...item };
        const elements = remItems.map((ele: any) => ele.elements);
        localItem.children = elements.flat(1);
        setCurrentItem(localItem);
      } else {
        setCurrentItem(item);
      }
    }
  }, [item, lastItem, menuOrientation, remItems, lastItemId]);

  const checkOpenForParent = (child: any, id: any) => {
    child.forEach((ele: any) => {
      if (ele.children?.length) {
        checkOpenForParent(ele.children, currentItem.id);
      }
      if (ele?.url && !!matchPath({ path: ele?.link ? ele.link : ele.url, end: true }, pathname)) {
        setSelectedID(id);
      }
    });
  };

  const checkSelectedOnload = (data: any) => {
    const childrens = data.children ? data.children : [];
    childrens.forEach((itemCheck: any) => {
      if (itemCheck?.children?.length) {
        checkOpenForParent(itemCheck.children, currentItem.id);
      }
      if (itemCheck?.url && !!matchPath({ path: itemCheck?.link ? itemCheck.link : itemCheck.url, end: true }, pathname)) {
        setSelectedID(currentItem.id);
      }
    });

    if (data?.url && !!matchPath({ path: data?.link ? data.link : data.url, end: true }, pathname)) {
      setSelectedID(currentItem.id);
    }
  };

  // keep selected-menu on page load and use for horizontal menu close on change routes
  useEffect(() => {
    checkSelectedOnload(currentItem);
    if (openMini) setAnchorEl(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, currentItem]);

  const handleClick = (event: any) => {
    if (!openMini) {
      setAnchorEl(event?.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Icon = currentItem?.icon;
  const itemIcon = currentItem?.icon ? <Icon stroke={1.5} size="20px" /> : null;

  // menu list collapse & items
  const items = currentItem.children?.map((menu: any) => {
    switch (menu?.type) {
      case 'collapse':
        return <NavCollapse key={menu.id} menu={menu} level={1} parentId={currentItem.id} />;
      case 'item':
        return <NavItem key={menu.id} item={menu} level={1} />;
      default:
        return (
          <Typography key={menu?.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  const moreItems = remItems?.map((itemRem: any, i: number) => (
    <Fragment key={i}>
      {itemRem.url ? (
        <NavItem item={itemRem} level={1} />
      ) : (
        itemRem.title && (
          <Typography variant="caption" sx={{ pl: 2 }}>
            {itemRem.title} {itemRem.url}
          </Typography>
        )
      )}
      {itemRem?.elements?.map((menu: any) => {
        switch (menu?.type) {
          case 'collapse':
            return <NavCollapse key={menu.id} menu={menu} level={1} parentId={currentItem.id} />;
          case 'item':
            return <NavItem key={menu.id} item={menu} level={1} />;
          default:
            return (
              <Typography key={menu.id} variant="h6" color="error" align="center">
                Menu Items Error
              </Typography>
            );
        }
      })}
    </Fragment>
  ));

  const popperId = openMini ? `group-pop-${item.id}` : undefined;
  const isSelected = selectedID === currentItem.id;

  return (
    <>
      {!isHorizontal ? (
        <>
          <List
            disablePadding={!drawerOpen}
            subheader={
              currentItem.title &&
              drawerOpen && (
                <Typography variant="caption" sx={{ ...theme.typography.menuCaption }} display="block" gutterBottom>
                  {currentItem.title}
                  {currentItem.caption && (
                    <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                      {currentItem.caption}
                    </Typography>
                  )}
                </Typography>
              )
            }
          >
            {items}
          </List>

          {/* group divider */}
          {drawerOpen && <Divider sx={{ mt: 0.25, mb: 1.25 }} />}
        </>
      ) : (
        <List>
          <ListItemButton
            selected={isSelected}
            sx={{
              borderRadius: `${borderRadius}px`,
              p: 1,
              my: 0.5,
              mr: 1,
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'inherit',
            }}
            onMouseEnter={handleClick}
            onClick={handleClick}
            onMouseLeave={handleClose}
            aria-describedby={popperId}
          >
            {itemIcon && (
              <ListItemIcon sx={{ minWidth: 36 }}>{currentItem.id === lastItemId ? <RemoveIcon /> : itemIcon}</ListItemIcon>
            )}
            <ListItemText
              sx={{ mr: 1 }}
              primary={
                <Typography variant={isSelected ? 'h5' : 'body1'} color="inherit">
                  {currentItem.id === lastItemId ? 'More Item' : currentItem.title}
                </Typography>
              }
            />
            {openMini ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}

            {anchorEl && (
              <Popper
                id={popperId}
                open={openMini}
                anchorEl={anchorEl}
                placement="bottom-start"
                sx={{
                  overflow: 'visible',
                  zIndex: 2001,
                  minWidth: 180,
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 5,
                    left: 32,
                    width: 12,
                    height: 12,
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 120,
                    borderWidth: '6px',
                    borderStyle: 'solid',
                    borderTopColor: 'background.paper',
                    borderLeftColor: 'background.paper',
                    borderRightColor: 'transparent',
                    borderBottomColor: 'transparent',
                  },
                }}
              >
                {({ TransitionProps }) => (
                  <Transitions in={openMini} {...TransitionProps}>
                    <Paper
                      sx={{
                        mt: 0.5,
                        py: 1.25,
                        boxShadow: theme.shadows[8],
                        backgroundImage: 'none',
                      }}
                    >
                      <ClickAwayListener onClickAway={handleClose}>
                        <Box
                          sx={{
                            minWidth: 200,
                            maxHeight: 'calc(100vh - 170px)',
                            overflowY: 'auto',
                            '&::-webkit-scrollbar': {
                              opacity: 0,
                              width: 4,
                              '&:hover': {
                                opacity: 0.7,
                              },
                            },
                            '&::-webkit-scrollbar-track': {
                              bgcolor: 'transparent',
                            },
                            '&::-webkit-scrollbar-thumb': {
                              bgcolor: 'divider',
                              borderRadius: 4,
                            },
                          }}
                        >
                          {currentItem.id !== lastItemId ? items : moreItems}
                        </Box>
                      </ClickAwayListener>
                    </Paper>
                  </Transitions>
                )}
              </Popper>
            )}
          </ListItemButton>
        </List>
      )}
    </>
  );
};

export default NavGroup;
