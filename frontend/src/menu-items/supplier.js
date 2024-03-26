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
      id: 'supplier',
      title: 'Supplier',
      type: 'collapse',
      icon: icons.ShoppingOutlined,
      children: [
        {
          id: 'add-supplier',
          title: 'Add Supplier',
          url: 'supplier/add',
          target: false,
        },
        {
          id: 'supplier-list',
          title: 'Supplier List',
          url: 'supplier/list',
          target: false,
        },
      ]
    },
  ]
};

export default supplier;
