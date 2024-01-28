// assets
import { ShoppingOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  ShoppingOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const product = {
  id: 'productsection',
  title: 'product section',
  type: 'group',
  children: [
    {
      id: 'category',
      title: 'Category',
      type: 'item',
      url: '/category',
      icon: icons.ShoppingOutlined,
      target: false
    },
    {
      id: 'product',
      title: 'Product',
      type: 'item',
      url: '/product',
      icon: icons.ProfileOutlined,
      target: false
    }
  ]
};

export default product;
