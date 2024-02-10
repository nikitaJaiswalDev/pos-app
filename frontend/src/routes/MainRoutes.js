import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';


// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const Order = Loadable(lazy(() => import('pages/orders/Order')));
const Category = Loadable(lazy(() => import('pages/category/Category')));
const Product = Loadable(lazy(() => import('pages/product/Product')));
const AddEmployee = Loadable(lazy(() => import('pages/employee/AddEmployee')));
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
      element: <DashboardDefault />
    },
    {
      path: '/orders',
      element: <Order />
    },
    {
      path: '/category',
      element: <Category />
    },
    {
      path: '/product',
      element: <Product />
    },
    {
      path: '/add-employee',
      element: <AddEmployee />
    },
    {
      path: '/create-role',
      element: <AddRole />
    },
    {
      path: '/add-supplier',
      element: <AddSupplier />
    },
    {
      path: '/supplier-list',
      element: <ListSupplier />
    },
    {
      path: '/add-customer',
      element: <AddCustomer />
    },
    {
      path: '/customer-list',
      element: <ListCustomer />
    },
    {
      path: '/shop-setup',
      element: <ShopSetup />
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
