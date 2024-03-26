import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import ProtectedRoute from './ProtectedRoute';


// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const Order = Loadable(lazy(() => import('pages/orders/Order')));
const Category = Loadable(lazy(() => import('pages/category/category/index')));
const SubCategory = Loadable(lazy(() => import('pages/category/sub-category/index')));
const AddNew = Loadable(lazy(() => import('pages/product/Add/index')));
const ListProduct = Loadable(lazy(() => import('pages/product/List/ListProduct')));
const Brand = Loadable(lazy(() => import('pages/brand/index')));
const Unit = Loadable(lazy(() => import('pages/unit/index')));
const AddEmployee = Loadable(lazy(() => import('pages/employee/employee/index')));
const AddRole = Loadable(lazy(() => import('pages/employee/role/index')));
const AddSupplier = Loadable(lazy(() => import('pages/supplier/add/index')));
const ListSupplier = Loadable(lazy(() => import('pages/supplier/list/index')));
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
      path: '/brand',
      element:  <ProtectedRoute><Brand /></ProtectedRoute>
    },
    {
      path: '/unit',
      element:  <ProtectedRoute><Unit /></ProtectedRoute>
    },
    {
      path: '/category',
      children: [
        {
          path: 'categories',
          element: <ProtectedRoute><Category /></ProtectedRoute>
        },
        {
          path: 'sub-categories',
          element: <ProtectedRoute><SubCategory /></ProtectedRoute>
        }
      ]
    },
    {
      path: '/product',
      children: [
        {
          path: 'add-new',
          element: <ProtectedRoute><AddNew /></ProtectedRoute>
        },
        {
          path: 'list',
          element: <ProtectedRoute><ListProduct /></ProtectedRoute>
        }
      ]
    },
    {
      path: '/add-employee',
      element:  <ProtectedRoute><AddEmployee /></ProtectedRoute>
    },
    {
      path: '/create-role',
      element:  <ProtectedRoute><AddRole /></ProtectedRoute>
    },
    {
      path: '/supplier',
      children: [
        {
          path: 'edit/:supplierId',
          element: <ProtectedRoute><AddSupplier /></ProtectedRoute>
        },
        {
          path: 'add',
          element: <ProtectedRoute><AddSupplier /></ProtectedRoute>
        },
        {
          path: 'list',
          element: <ProtectedRoute><ListSupplier /></ProtectedRoute>
        }
      ]
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
