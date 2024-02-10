// assets
import { ShoppingOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  ShoppingOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - SUPPLIER ||============================== //

const supplier = {
  id: 'supplier_section',
  title: 'supplier section',
  type: 'group',
  children: [
    {
      id: 'add_supplier',
      title: 'Add Supplier',
      type: 'item',
      url: '/add-supplier',
      icon: icons.ShoppingOutlined,
      target: false
    },
    {
      id: 'supplier_list',
      title: 'Supplier List',
      type: 'item',
      url: '/supplier-list',
      icon: icons.ProfileOutlined,
      target: false
    }
  ]
};

export default supplier;
