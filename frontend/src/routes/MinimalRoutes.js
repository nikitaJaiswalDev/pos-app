import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const Pos = Loadable(lazy(() => import('pages/pos/index')));

// ==============================|| AUTH ROUTING ||============================== //

const MinimalRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: 'login',
      element: <AuthLogin />
    },
    {
      path: 'pos',
      element: <Pos />
    }
  ]
};


export default MinimalRoutes;
