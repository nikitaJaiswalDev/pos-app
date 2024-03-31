// assets
import StorefrontIcon from '@mui/icons-material/Storefront';

// icons
const icons = {
  StorefrontIcon
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
      icon: icons.StorefrontIcon,
      breadcrumbs: false
    }
  ]
};

export default settings;
