import React from 'react';
import { Outlet, Route } from 'react-router-dom';

import Loadable from '@/components/loadable';

// pages
const PrivacyPolicy = Loadable(React.lazy(() => import('@/pages/privacy-policy')));

// configs
import { PATH_NAME } from '@/configs/path-name';

const publicRoutes = () => {
  return (
    <Route
      element={
        <div>
          <Outlet />
        </div>
      }
    >
      <Route path={PATH_NAME.PRIVACY_POLICY} element={<PrivacyPolicy />} />
    </Route>
  );
};

export const PublicRoutes = publicRoutes();
