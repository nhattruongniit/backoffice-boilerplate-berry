import { memo, useLayoutEffect, useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import NavItem from './nav-item';
import NavGroup from './nav-group';
import { menuItem } from '@/configs/menuItem';

import { MenuOrientation } from '@/configs';
import { HORIZONTAL_MAX_ITEM } from '@/configs';
import { useAppSetting } from '@/contexts/app-setting';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const { drawerOpen } = useAppSetting();
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const { menuOrientation } = useAppSetting();
  const menuLoading = false;
  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downMD;

  const [selectedID, setSelectedID] = useState('');
  const [menuItems, setMenuItems] = useState<any>({ items: [] });

  useLayoutEffect(() => {
    const isFound = menuItem.items.some((element: any) => {
      if (element.id === 'group-widget') {
        return true;
      }
      return false;
    });
    if (menuLoading) {
      menuItem.items.splice(1, 0);
      setMenuItems({ items: [...menuItem.items] });
    } else if (!menuLoading && !isFound) {
      menuItem.items.splice(1, 1);
      setMenuItems({ items: [...menuItem.items] });
    } else {
      setMenuItems({ items: [...menuItem.items] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuLoading]);

  // last menu-item to show in horizontal menu bar
  const lastItem = isHorizontal ? HORIZONTAL_MAX_ITEM : null;

  let lastItemIndex = menuItems.items.length - 1;
  let remItems: any = [];
  let lastItemId: any = null;

  if (lastItem && lastItem < menuItems.items.length) {
    lastItemId = menuItems.items[lastItem - 1].id;
    lastItemIndex = lastItem - 1;
    remItems = menuItems.items.slice(lastItem - 1, menuItems.items.length).map((item: any) => ({
      title: item.title,
      elements: item.children,
      icon: item.icon,
      ...(item.url && {
        url: item.url,
      }),
    }));
  }

  const navItems = menuItems.items.slice(0, lastItemIndex + 1).map((item: any, index: number) => {
    switch (item.type) {
      case 'group':
        if (item.url && item.id !== lastItemId) {
          return (
            <List key={item.id}>
              <NavItem item={item} level={1} isParents setSelectedID={() => setSelectedID('')} />
              {!isHorizontal && index !== 0 && <Divider sx={{ py: 0.5 }} />}
            </List>
          );
        }

        return (
          <NavGroup
            key={item.id}
            setSelectedID={setSelectedID}
            selectedID={selectedID}
            item={item}
            lastItem={lastItem}
            remItems={remItems}
            lastItemId={lastItemId}
          />
        );
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return !isHorizontal ? <Box {...(drawerOpen && { sx: { mt: 1.5 } })}>{navItems}</Box> : <>{navItems}</>;
};

export default memo(MenuList);
