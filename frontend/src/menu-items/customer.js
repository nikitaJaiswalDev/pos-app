// assets
import { ShoppingOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  ShoppingOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - CUSTOMER ||============================== //

const customer = {
  id: 'customersection',
  title: 'customer section',
  type: 'group',
  children: [
    {
      id: 'add_customer',
      title: 'Add Customer',
      type: 'item',
      url: '/add-customer',
      icon: icons.ShoppingOutlined,
      target: false
    },
    {
      id: 'customer_list',
      title: 'Customer List',
      type: 'item',
      url: '/customer-list',
      icon: icons.ProfileOutlined,
      target: false
    }
  ]
};

export default customer;
