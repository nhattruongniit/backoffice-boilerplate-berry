import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AppsIcon from '@mui/icons-material/Apps';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

import { PATH_NAME } from './path-name';

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  icon: DashboardIcon,
  type: 'group',
  children: [
    {
      id: 'statistics',
      title: 'Statistics',
      type: 'item',
      url: '/dashboard/statistics',
      icon: DashboardIcon,
      breadcrumbs: true,
    },
    {
      id: 'analytics',
      title: 'Analytics',
      type: 'item',
      url: '/dashboard/analytics',
      icon: AnalyticsIcon,
      breadcrumbs: true,
    },
  ],
};

const application = {
  id: 'application',
  title: 'Application',
  icon: AppsIcon,
  type: 'group',
  children: [
    {
      id: 'user',
      title: 'User',
      type: 'collapse',
      icon: ManageAccountsIcon,
      children: [
        {
          id: 'portfolio',
          title: 'Portfolio',
          type: 'item',
          // link: '/apps/user/profile/:tab',
          url: '/application/user/portfolio',
          breadcrumbs: true,
        },
        {
          id: 'user-list',
          title: 'List',
          type: 'item',
          url: PATH_NAME.USER_LIST,
          breadcrumbs: true,
        },
      ],
    },
    {
      id: 'mail',
      title: 'Mail',
      type: 'item',
      icon: MailOutlineIcon,
      url: '/application/mail',
    },
  ],
};

export const menuItem = {
  items: [dashboard, application],
};
