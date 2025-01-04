import React from 'react';
import { Navigate } from 'react-router-dom';

import { PATH_NAME } from '@/configs/path-name';

const AuthGuard = ({ children }: React.PropsWithChildren) => {
  const isAuth = window.localStorage.getItem('access_token');

  if (!isAuth) return <Navigate to={PATH_NAME.LOGIN} replace />;

  return <>{children}</>;
};

export default AuthGuard;
