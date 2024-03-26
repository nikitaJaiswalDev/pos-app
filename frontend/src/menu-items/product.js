// assets
import StarIcon from '@mui/icons-material/Star';
import AdUnitsIcon from '@mui/icons-material/AdUnits';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';

// icons
const icons = {
  StarIcon,
  AdUnitsIcon,
  CategoryIcon,
  InventoryIcon
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
      type: 'collapse',
      icon: icons.CategoryIcon,
      children: [
        {
          id: 'child-category',
          title: 'Category',
          url: 'category/categories',
          target: false,
        },
        {
          id: 'child-sub-category',
          title: 'Sub Category',
          url: 'category/sub-categories',
          target: false,
        },
      ]
    },
    {
      id: 'product',
      title: 'Product',
      type: 'collapse',
      icon: icons.InventoryIcon,
      children: [
        {
          id: 'add-new',
          title: 'Add New',
          url: 'product/add-new',
          target: false,
        },
        {
          id: 'product-list',
          title: 'List',
          url: 'product/list',
          target: false,
        }
      ]
    },
    {
      id: 'brand',
      title: 'Brand',
      type: 'item',
      url: '/brand',
      icon: icons.StarIcon,
      breadcrumbs: false
    },
    {
      id: 'unit',
      title: 'Unit',
      type: 'item',
      url: '/unit',
      icon: icons.AdUnitsIcon,
      breadcrumbs: false
    }
  ]
};

export default product;
