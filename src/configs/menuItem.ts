import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AppsIcon from '@mui/icons-material/Apps';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const dashboard = {
  id: 'dashboard',
  title: "Dashboard",
  icon: DashboardIcon,
  type: 'group',
  children: [
    {
      id: 'statistics',
      title: "Statistics",
      type: 'item',
      url: '/dashboard/statistics',
      icon: DashboardIcon,
      breadcrumbs: false
    },
    {
      id: 'analytics',
      title: 'Analytics',
      type: 'item',
      url: '/dashboard/analytics',
      icon: AnalyticsIcon,
      breadcrumbs: false
    }
  ]
};

const application = {
  id: 'application',
  title: "Application",
  icon: AppsIcon,
  type: 'group',
  children: [
    {
      id: 'users',
      title: "User",
      type: 'collapse',
      icon: ManageAccountsIcon,
      children: [
        {
            id: 'posts',
            title: "Profile",
            type: 'item',
            link: '/apps/user/profile/:tab',
            url: '/apps/user/profile/personal',
            breadcrumbs: false
        },
      ]
    },
    {
      id: 'mail',
      title: "Mail",
      type: 'item',
      icon: MailOutlineIcon,
      url: '/apps/mail'
  },
  ]
}

export const menuItem = {
  items: [dashboard, application]
}