import React from 'react';
import { Outlet, Route } from 'react-router-dom';
import { ResourceProps } from '@refinedev/core/dist/contexts/resource/types';

import AuthGuard from '@/guards/auth-guard';
import MainLayout from '@/layout/main-layout';
import Loadable from '@/components/loadable';

// pages
const Statistics = Loadable(React.lazy(() => import('@/pages/dashboard/statistics')));
const Analytics = Loadable(React.lazy(() => import('@/pages/dashboard/analytics')));
const Mail = Loadable(React.lazy(() => import('@/pages/application/mail')));
const Portfolio = Loadable(React.lazy(() => import('@/pages/application/user/portfolio')));
const UserList = Loadable(React.lazy(() => import('@/pages/application/user/list')));
const UserCreate = Loadable(React.lazy(() => import('@/pages/application/user/create')));

// configs
import { PATH_NAME } from '@/configs/path-name';

export const authenticatedResources: ResourceProps[] = [
  {
    name: 'user',
    list: '/user',
    create: '/user/create',
    edit: '/user/edit/:id',
    show: '/user/show/:id',
  },
  {
    name: 'dashboard/statistics',
    list: 'dashboard/statistics',
  },
  {
    name: 'analytics',
    list: PATH_NAME.ANALYTICS,
  },
  {
    name: 'mail',
    list: PATH_NAME.MAIL,
  },
];

const authenticatedRoutes = () => {
  return (
    <Route
      element={
        <AuthGuard>
          <MainLayout>
            <Outlet />
          </MainLayout>
        </AuthGuard>
      }
    >
      <Route path={PATH_NAME.STATISTICS} element={<Statistics />} />
      <Route path={PATH_NAME.ANALYTICS} element={<Analytics />} />
      <Route path={PATH_NAME.MAIL} element={<Mail />} />
      <Route path={PATH_NAME.PORTFOLIO} element={<Portfolio />} />
      <Route path={PATH_NAME.USER_LIST}>
        <Route index element={<UserList />} />
        <Route path={PATH_NAME.USER_CREATE} element={<UserCreate />} />
      </Route>
    </Route>
  );
};

export const AuthenticatedRoutes = authenticatedRoutes();
