import React from 'react';
import { Outlet, Route } from 'react-router-dom';

import AuthGuard from '@/guards/auth-guard';
import MainLayout from '@/layout/main-layout';
import Loadable from '@/components/loadable';

// pages
const Statistics = Loadable(React.lazy(() => import('@/pages/dashboard/statistics')));
const Analytics = Loadable(React.lazy(() => import('@/pages/dashboard/analytics')));
const Mail = Loadable(React.lazy(() => import('@/pages/application/mail')));
const Portfolio = Loadable(React.lazy(() => import('@/pages/application/user/portfolio')));

// configs
import { PATH_NAME } from '@/configs/path-name';

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
    </Route>
  );
};

export const AuthenticatedRoutes = authenticatedRoutes();
