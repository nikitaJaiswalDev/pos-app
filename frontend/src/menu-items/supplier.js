// assets
import GroupIcon from '@mui/icons-material/Group';
// icons
const icons = {
  GroupIcon
};
// assets


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
      icon: icons.GroupIcon,
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
