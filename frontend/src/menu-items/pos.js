// assets
import { ShoppingOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  ShoppingOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pos = {
  id: 'possection',
  title: 'pos section',
  type: 'group',
  children: [
    {
      id: 'pos',
      title: 'POS',
      type: 'item',
      url: '/pos',
      icon: icons.ShoppingOutlined,
      target: true
    },
    {
      id: 'orders',
      title: 'Orders',
      type: 'item',
      url: '/orders',
      icon: icons.ProfileOutlined,
      target: false
    }
  ]
};

export default pos;
