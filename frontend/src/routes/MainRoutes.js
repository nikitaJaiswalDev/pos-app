import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import ProtectedRoute from './ProtectedRoute';


// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const Order = Loadable(lazy(() => import('pages/orders/Order')));
const Category = Loadable(lazy(() => import('pages/category/Category')));
const Product = Loadable(lazy(() => import('pages/product/Product')));
const AddEmployeeNew = Loadable(lazy(() => import('pages/employee/AddEmployeeNew')));
const AddRole = Loadable(lazy(() => import('pages/employee/AddRole')));
const AddSupplier = Loadable(lazy(() => import('pages/supplier/Add')));
const ListSupplier = Loadable(lazy(() => import('pages/supplier/List')));
const AddCustomer = Loadable(lazy(() => import('pages/customer/Add')));
const ListCustomer = Loadable(lazy(() => import('pages/customer/List')));
const ShopSetup = Loadable(lazy(() => import('pages/settings/ShopSetup')));
// const Pos = Loadable(lazy(() => import('pages/pos/Pos')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <ProtectedRoute><DashboardDefault /></ProtectedRoute>
    },
    {
      path: '/orders',
      element:  <ProtectedRoute><Order /></ProtectedRoute>
    },
    {
      path: '/category',
      element:  <ProtectedRoute><Category /></ProtectedRoute>
    },
    {
      path: '/product',
      element:  <ProtectedRoute><Product /></ProtectedRoute>
    },
    {
      path: '/add-employee',
      element:  <ProtectedRoute><AddEmployeeNew /></ProtectedRoute>
    },
    {
      path: '/create-role',
      element:  <ProtectedRoute><AddRole /></ProtectedRoute>
    },
    {
      path: '/add-supplier',
      element:  <ProtectedRoute><AddSupplier /></ProtectedRoute>
    },
    {
      path: '/supplier-list',
      element:  <ProtectedRoute><ListSupplier /></ProtectedRoute>
    },
    {
      path: '/add-customer',
      element:  <ProtectedRoute><AddCustomer /></ProtectedRoute>
    },
    {
      path: '/customer-list',
      element:  <ProtectedRoute><ListCustomer /></ProtectedRoute>
    },
    {
      path: '/shop-setup',
      element:  <ProtectedRoute><ShopSetup /></ProtectedRoute>
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'icons/ant',
      element: <AntIcons />
    }
  ]
};

export default MainRoutes;
