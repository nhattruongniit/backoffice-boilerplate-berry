import React from 'react';
import { Route } from 'react-router-dom';

import GuestGuard from '@/guards/guest-guard';
import MinimalLayout from '@/layout/minimal-layout';
import Loadable from '@/components/loadable';

// pages
const Login = Loadable(React.lazy(() => import('@/pages/login')));
const Register = Loadable(React.lazy(() => import('@/pages/register')));
const ForgotPassword = Loadable(React.lazy(() => import('@/pages/forgot-password')));

// configs
import { PATH_NAME } from '@/configs/path-name';

export const guestRoutes = () => {
  return (
    <Route
      element={
        <GuestGuard>
          <MinimalLayout />
        </GuestGuard>
      }
    >
      <Route path={PATH_NAME.LOGIN} element={<Login />} />
      <Route path={PATH_NAME.REGISTER} element={<Register />} />
      <Route path={PATH_NAME.FORGOT_PASSWORD} element={<ForgotPassword />} />
    </Route>
  );
};

export const GuestRoutes = guestRoutes();
