// assets
import { HomeOutlined } from '@ant-design/icons';

// icons
const icons = {
  HomeOutlined
};

// ==============================|| MENU ITEMS - SETTINGS ||============================== //

const settings = {
  id: 'settingsection',
  title: 'setting section',
  type: 'group',
  children: [
    {
      id: 'shop_setup',
      title: 'Shop Setup',
      type: 'item',
      url: '/shop-setup',
      icon: icons.HomeOutlined,
      breadcrumbs: false
    }
  ]
};

export default settings;
